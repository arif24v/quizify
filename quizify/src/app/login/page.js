"use client"

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"

export default function Page() {
    let state = "L";
    const [stateIn, setState] = useState("Log In");
    async function switchMethod(m){
        console.log("test");
        if(!m===state){
            if(m==="L"){
                console.log("logging in");
                state = "L";
                title.innerText="Log In";
            } else{
                console.log("signing up");
                state = "S";
                title.innerText="Sign Up";
            }
        }
    }
    return (
        <main>
            <div>
                
                /*kinda need to get rid of this line cuz its making all the buttons highlight blue and ignore our original css but getting rid of it makes the page go weird*/
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            </div>   
            {<div>
                <div className="flex flex-row w-full l-[50vw]">
                    <div className="w-[45vw] h-[100vh] flex flex-row">
                        <img src="books.jpg" className="w-full h-full" />
                    </div>
                    <div>
                        <div class="h-[4vw]">
                            
                            <button class="btn position-absolute start-[60vw] hover:underline text-brown font-mono" type="button" onClick={() => setState("Log In")}>Log In</button>
                            <button class="btn position-absolute start-[80vw] hover:underline text-brown font-mono" type="button" onClick={() => setState("Sign Up")}>Sign Up</button>
                        </div>
                        
                        <form className="flex flex-col position-absolute start-[60vw]">
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
                </div>
            </div>}
        </main>
    );
}



