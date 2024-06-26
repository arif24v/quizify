"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Typewriter } from 'react-simple-typewriter'

export default function Banner() {

    const canvasRef = useRef(null)

    const phrases = [
        "meaningfully", "quickly", "tactfully", "truthfully", "masterfully", "eventfully", "peacefully", "beautifully", "colorfully", "cheerfully"
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
            const radius = canvas.width < 600 ? 50 : 100;
            context.translate(canvas.width < 600 ? canvas.width : canvas.width * 0.75, canvas.height / 2);
            context.beginPath()            

            context.beginPath()
            context.arc(-120, 0, radius * 0.9, -Math.PI / 2, 2 * Math.PI);
            context.lineWidth = 10;
            context.strokeStyle = "btn-200";
            context.stroke();

            context.beginPath()
            context.fillStyle = "#86530b";
            context.arc(-120, 0, radius * 0.5, -Math.PI / 2, 2 * Math.PI);
            context.fill()
            context.lineWidth = 10;
            context.strokeStyle = "btn-200";
            context.stroke();

            context.beginPath()
            context.arc(120, 0, radius * 0.9, -Math.PI / 2, 2 * Math.PI);
            context.lineWidth = 10;
            context.strokeStyle = "btn-200";
            context.stroke();

            context.beginPath()
            context.fillStyle = "#86530b";
            context.arc(120, 0, radius * 0.5, -Math.PI / 2, 2 * Math.PI);
            context.fill()
            context.lineWidth = 10;
            context.strokeStyle = "btn-200";
            context.stroke();

            context.beginPath()
            context.fillStyle = "#86530b";
            context.moveTo(0, 50)
            context.strokeStyle = "btn-200";
            context.lineWidth = 10;
            context.lineTo(25, 100)
            context.lineTo(0, 150)
            context.lineTo(-25, 100)
            context.lineTo(0, 50)
            context.fill()
            context.stroke()

            //context.lineTo(Math.cos(Math.PI / 4) * (1.3 * radius), -Math.sin((2 * Math.PI) - (Math.PI/5)) * (radius));
            //context.stroke()

            
        }
    }

    return (
        <main className={`h-[60vh] md:h-[75vh] min-h-[30rem] bg-btn-200 relative overflow-hidden`}>
        
        <div className="flex flex-row items-center justify-center z-20 absolute top-0 left-0 w-full h-full p-8 bg-opacity-80 bg-gradient-to-b from-btn-100 from-3% via-btn-500 to-beige to-97%">
        <canvas onResize={handleResize} ref={canvasRef} className="absolute right-0"> </canvas>    
            <div className="flex flex-row items-center w-full max-w-screen-xl">
                <div className="md:w-2/3 w-full">
                    <h1 className={`bg-gradient-to-b from-browns to-browns-200 text-transparent bg-clip-text text-8xl md:text-9xl font-extrabold mb-2 mt-2`}>QUIZIFY!</h1>
                    <p className={`pl-5 mt-3 font-mono text-btn-400 text-md`}> 
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