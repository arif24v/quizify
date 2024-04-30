"use client"

import { useEffect, useRef, useState } from "react"

export default function Banner() {

    const canvasRef = useRef(null)

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
        <main>
            <canvas onResize={draw} ref={canvasRef} className="relative top-0 left-0 h-[50vh]" />
        </main>
    );
}