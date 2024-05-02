"use client"

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"

export default function Page() {
    let state = "L";
    const [stateIn, setState] = useState("Log In");
    async function switchMethod(m) {
        console.log("test");
        if (!m === state) {
            if (m === "L") {
                console.log("logging in");
                state = "L";
                title.innerText = "Log In";
            } else {
                console.log("signing up");
                state = "S";
                title.innerText = "Sign Up";
            }
        }
    }
    return (
        <main>
            {<div>
                {
                    
                <div class="gap-4 columns-2">
                    <div>
                        <img class="h-[93vh] w-[50vw]" src="books.jpg" alt="books.jpg" />
                    </div>
                    <div className="h-[30vh] w-full items-center justify-center flex flex-col align-items">
                        <div class="pt-20 text-5xl font-mono"> LOG IN </div>
                    </div>
                    <div>
                    </div>

                    <div>
                        <div class="ml-40 text-3xl text-brown font-mono">
                            Username:
                        </div>
                    </div>
                </div>
                }
                
                
                
                
                
                
                
                
                
                {/* <div className="flex flex-row">
                    <div className="flex flex-row">
                        <img src="books.jpg" className="w-100 h-100" />
                    </div>
                    <div>

                            <button className="ml-25 hover:underline text-brown font-mono" type="button" onClick={() => setState("Log In")}>Log In</button>
                            <button className="ml-25 hover:underline text-brown font-mono" type="button" onClick={() => setState("Sign Up")}>Sign Up</button>

                        <form className="flex flex-col">
                            <div class="mx-auto">
                                <h1 class="display-3 h-[10vw]" id="title">{stateIn}</h1>
                            </div>
                            <div class="form-row align-items-center">
                                <label for="inputUser" class="h4">Username</label>
                                <input type="text" class="form-control" id="inputUser" placeholder="Username"></input>
                            </div>
                            <div class="h-[2vw]"></div>
                            <div class="form-group">
                                <label for="inputPass" class="h4">Password</label>
                                <input type="text" class="form-control" id="inputPass" placeholder="Password"></input>
                            </div>
                            <button type="submit" class="btn btn-primary" id="submit">{stateIn}</button>
                        </form>
                    </div>
                </div> */}
            </div>}
        </main>
    );
}