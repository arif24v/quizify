"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Typewriter } from 'react-simple-typewriter'

export default function Banner() {

    const canvasRef = useRef(null)

    const phrases = [
        "meaningfully", "quickfully", "tactfully", "truthfully", "masterfully", "eventfully", "peacefully"
    ];

    useEffect(() => {
        window.addEventListener("resize", () => handleResize());
        handleResize()
    })

    function handleResize() {
        if (canvasRef.current) {
            const parent = canvasRef.current.parentElement;

            if (parent) {
                const rect = parent.getBoundingClientRect()
                canvasRef.current.width = rect.width;
                canvasRef.current.height = rect.height;
            }
        }
        draw()
    }

    function draw() {
        const canvas = canvasRef.current;
        if (canvas) {



            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.lineCap = "round";
            const radius = canvas.width < 600 ? 200 : 300;
            context.translate(canvas.width < 600 ? canvas.width : canvas.width * 0.75, canvas.height / 2);
            context.beginPath()            

            context.beginPath()
            context.arc(0, 0, radius * 0.9, -Math.PI / 2, 2 * Math.PI);
            context.lineWidth = 10;
            context.strokeStyle = "#0c4a6e";
            context.stroke();

            context.beginPath()
            context.moveTo(0, 0)
            context.strokeStyle = "#000000";
            context.lineWidth = 10;
            context.lineTo(Math.cos(Math.PI / 4) * (1.3 * radius), -Math.sin((2 * Math.PI) - (Math.PI/5)) * (radius));
            context.stroke()

            
        }
    }

    return (
        <main className={`h-[60vh] md:h-[75vh] min-h-[30rem] bg-gray relative border-b-2 overflow-hidden`}>
        <canvas onResize={handleResize} ref={canvasRef} className="relative top-0 left-0"> </canvas>
        <div className="flex flex-row items-center justify-center z-20 absolute top-0 left-0 w-full h-full p-8 bg-opacity-80 bg-gray md:bg-opacity-100 md:bg-transparent md:bg-gradient-to-bl md:via-90% md:via-stone-500 md:from-transparent md:to-stone-600">
            <div className="flex flex-row items-center w-full max-w-screen-xl">
                <div className="md:w-2/3 w-full">
                    <h1 className={`bg-gradient-to-b from-btn-100 to-btn-200 text-transparent bg-clip-text text-7xl md:text-8xl font-extrabold mb-2 mt-2`}>Quizify!</h1>
                    <p className={`pl-5 mt-3 font-mono text-stone-800 text-sm`}> 
                        <span>
                            Learn <Typewriter 
                             words={phrases}
                             loop={5}
                             cursor
                             cursorStyle='_'
                             typeSpeed={70}
                             deleteSpeed={50}
                             delaySpeed={1000}
                            /> 
                        </span> 
                    </p>
                </div>
            </div>
        </div>
    </main>
    );
}