"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [front, isFront] = useState(true);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }
  return (
    <div className="flex items-center justify-center bg-black h-[800px] cursor-pointer">
      <div
        className="flip-card w-[600px] h-[360px] rounded-md"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
            {!isFlipped &&
            <div
                className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
            >
                <h1 className="text-2xl font-bold/">Sky</h1>
                <p>Live on top of the world</p>
            </div>
            }
            {isFlipped && 
            <div
                className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"

            >
                <h1 className="text-2xl font-bold/">Earth</h1>
                <p>Or in the maze of the city</p>
            </div>
            }
        </motion.div>
      </div>
    </div>
  );
};

export default CardFlip;