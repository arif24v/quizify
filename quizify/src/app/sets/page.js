//Allow card to flip when clicked on (along with the "Flip" button
//Verical flip instead of horizontal? (not super important)
//Counter below card and buttons to show progress through domain? (i.e. 4/23 or a progress bar)

"use client"

import Domain from "./../components/domains/domain.js";
import { doc, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db } from "./../firebase.js"
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


    return (
      <main>
        {domain &&
          <div className="">
            <div className="text-5xl ml-10 mt-10 mb-5"> {domain.title} </div>
            <div className="text-3xl ml-10 mb-10"> {domain.description} </div>
            
              <div className="flex items-center justify-center">
                <div className="w-1/2 flex justify-end">
                  
                  {domain.cards[currentCard].imageUrl &&
                    <div className="font-mono text-black bg-cyan-300 hover:bg-cyan-400 ease-in-out duration-100 pl-3 pr-3 mb-3 overflow-hidden rounded-md">
                      <button onClick={() => setShowingImage(true) }className= "font-mono text-black ease-in-out duration-100 overflow-hidden rounded-md text-nowrap"> View Attachment </button>
                    </div>
                  }
                  {!domain.cards[currentCard].imageUrl &&
                    <div className="font-mono text-black ease-in-out duration-100 pl-3 pr-3 mb-3 overflow-hidden rounded-md">
                    < div>&nbsp;</div>
                    </div>
                  }
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
                    <div className="bg-metal rounded-lg text-center flex justify-center items-center w-1/2 p-20 h-full"> 
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
              <button className="rounded-2xl bg-amber-300 p-3" onClick={(e) => increment(e, 1)}> PREV </button>
              <button className="rounded-2xl bg-amber-300 p-3"  onClick={handleFlip}> FLIP </button>
              <button className="rounded-2xl bg-amber-300 p-3" onClick={(e) => increment(e, -1)}> NEXT </button>
            </div>
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
  