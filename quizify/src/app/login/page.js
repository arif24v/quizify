"use client"

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../firebaseLogin.js"
export default function Page() {
const logins = collection(db, 'logins');
async function register(u, p){
    let exist = false;
    //check for duplicate usernames
    logins.forEach((user) => {
        console.log(user);
        if(u===user){
            exist = true;
        }
      })
    if (exist) { //duplicate
        alert("Username is taken");
    } else{
        const loginData = {
            user: u,
            pass: p
        };
        const newDocRef = await addDoc(logins, loginData);
        console.log('new user');
        window.history.pushState("http://localhost:3000");
        return false;
    }
}
async function signin(u,p){
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()&&docSnap.data.pass===p) { //success
        console.log("logged in");
        window.history.pushState("http://localhost:3000");
        return true;
    } else{
        alert("Username or password is incorrect");
    }
}
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
                            <div class="form-group h-[7vw]">
                                <label for="inputPass" class="h4">Password</label>
                                <input type="text" class="form-control" id="inputPass" placeholder="Password"></input>
                            </div>
                            <a class="btn btn-info" role="button" onClick={() => onclick(inputUser.value, inputPass.value)}>{stateIn}</a>
                        </form>
                    </div>
                </div> */}
            </div>}
        </main>
    );
}
