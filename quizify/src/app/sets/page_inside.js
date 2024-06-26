//Allow card to flip when clicked on (along with the "Flip" button
//Verical flip instead of horizontal? (not super important)
//Counter below card and buttons to show progress through domain? (i.e. 4/23 or a progress bar)

"use client"

import Domain from "../components/domains/domain.js";
import { doc, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db } from "../firebase.js"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"

export default function Post({ params }) {

  let [domain, setDomain] = useState();
  let [currentCard, setCurrentCard] = useState(0);

  // DISPLAY ATTACHMENTS IN MODAL
  let[showingImage, setShowingImage] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
    

  useEffect(()=> {
      
    fetchDomain();

  }, [])

  async function fetchDomain() {
    const domainDoc = await getDoc(doc(db, "domains/" + id))
    setDomain(domainDoc.data());
  }

  function increment(e, factor) {
    e.preventDefault();
    if (currentCard+factor >= domain.cards.length && factor > 0) {
      setCurrentCard(0);
    } else if (currentCard+factor < 0 && factor < 0) {
      setCurrentCard(domain.cards.length-1);
    } else {
      setCurrentCard(currentCard+factor);
    }
  }

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [td, setTd] = useState(true);

  function handleFlip() {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => {
        setTd(!td);
      }, 200); // 0.3 second delay
    }
  }

  const editRef = {
    pathname: '/create',
    query: {
      id: id
    }
  }


    return (
      <main>
        {domain &&
          <div className="">
            <div className="text-5xl ml-10 mt-10 mb-5"> {domain.title} </div>
            <div className="text-3xl ml-10 mb-10"> {domain.description} </div>
            
              <div className="flex items-center justify-center">
              
                <div className="w-1/2 flex justify-end">
                  
                  
                  {domain.cards[currentCard].imageUrl &&
                    <div className="font-mono text-black bg-btn hover:bg-btn-200 ease-in-out duration-100 pl-3 pr-3 mb-3 overflow-hidden rounded-md">
                      <button onClick={() => setShowingImage(true) }className= "font-mono text-black ease-in-out duration-100 overflow-hidden rounded-md text-nowrap"> View Attachment </button>
                    </div>
                  }
                  {!domain.cards[currentCard].imageUrl &&
                    <div className="font-mono text-black ease-in-out duration-100 pl-3 pr-3 mb-3 overflow-hidden rounded-md bg-transparent">
                    < div>&nbsp;</div>
                    </div>
                  }
                  <div className="font-mono flex flex-row bg-btn hover:bg-btn-200 ease-in-out duration-100 pl-3 pr-3 mb-3 rounded-md ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <Link href={editRef}> &#160; Edit Set </Link>
                  </div>
                </div>
              </div>
            
            <div className="flip-card"> 
              <motion.div
                className="flip-card-inner w-[100%] h-[100%]"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="bg-gray rounded-lg text-center flex justify-center items-center w-1/2 p-20 h-full"> 
                      {td &&
                        <div className="flip-card-front  overflow-auto"> {domain.cards[currentCard].term} </div>
                      }
                      {!td && 
                        <div className="flip-card-back transform scale-x-[-1]  overflow-auto"> {domain.cards[currentCard].def} </div>
                      }
                    </div>
                </div>
              </motion.div>
              
            </div>

            <div className="flex flex-row gap-5 items-center justify-center m-5">
              <button className="rounded-2xl bg-btn hover:bg-btn-200 p-3" onClick={(e) => increment(e, -1)}> PREV </button>
              <button className="rounded-2xl bg-btn hover:bg-btn-200 p-3"> I DON'T KNOW THE ANSWER </button>
              <button className="rounded-2xl bg-btn hover:bg-btn-200 p-3"  onClick={handleFlip}> FLIP </button>
              <button className="rounded-2xl bg-btn hover:bg-btn-200 p-3"> I KNOW THE ANSWER </button>
              <button className="rounded-2xl bg-btn hover:bg-btn-200 p-3" onClick={(e) => increment(e, 1)}> NXT </button>
            </div>
            <div className="text-center w-[100vw] font-mono text-btn-200"> <b>{currentCard+1}/{domain.cards.length}</b> </div>
          </div>
        }

        { showingImage && 

          <div className={"backdrop-blur-lg fixed inset-0 bg-opacity-25 flex flex-col justify-center items-center"}>
                <div className="flex flex-col text-3xl p-7 font-mono">
                  <img className="w-[50vw] h-[50vh]" src = {domain.cards[currentCard].imageUrl} />
                </div>

                <div className="flexflex-row mt-5">
                    <button onClick = {(e) => setShowingImage(false)} className="hover:bg-gray-200 ease-in-out duration-150 rounded-lg font-mono bg-gray-100 p-3 flex flex-row m-3">
                        Exit
                    </button>
                </div>     
          </div>
        }
      </main>

    );
  }
  