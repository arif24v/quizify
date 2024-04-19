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
    console.log(domain);
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
      }, 300); // 0.3 second delay
    }
  }


    return (
      <main>
        {domain &&
          <div className="">
            <div className="text-5xl ml-10 mt-10 mb-5"> {domain.title} </div>
            <div className="text-3xl ml-10 mb-10"> {domain.description} </div>
            <div className="flip-card"> 
              <motion.div
                className="flip-card-inner w-[100%] h-[100%]"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="w-full h-96 flex items-center justify-center">
                    <div className="bg-yellow-700 rounded-lg text-center flex justify-center items-center w-1/2 p-20 h-full"> 
                      {td &&
                        <div className="flip-card-front"> {domain.cards[currentCard].term} </div>
                      }
                      {!td && 
                        <div className="flip-card-back transform scale-x-[-1]"> {domain.cards[currentCard].def} </div>
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
      </main>

    );
  }
  