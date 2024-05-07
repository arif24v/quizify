"use client"
import app from './../firebaseLogin.js';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, setDoc, getDocs, getDoc} from "firebase/firestore";
import { db } from "./../firebaseLogin.js"
export default function Page() {
    var stateIn = "Log In";
async function register(u, p){
    let exist = false;
    //check for duplicate usernames
    const querySnapshot = await getDocs(collection(db, 'logins'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(doc.data().user===u){
            exist = true;
        }
    });
    if (exist) { //duplicate
        alert("Username is taken");
        
    } else{
        await addDoc(collection(db, 'logins'), {
            user: u,
            pass: p
          });
        console.log('new user');
        document.location.href = "http://localhost:3000";
    }
}
async function signin(u,p){
    const querySnapshot = await getDocs(collection(db, 'logins'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(doc.data().user===u&&doc.data().pass===p){
            console.log("logged in");
            document.location.href = "http://localhost:3000";
        } else{
            alert("Username or password is incorrect");
        }
    });
}
    function setState(s){
        stateIn = s;
        if(s==="Log In"){
            loginLink.style.textDecoration = "underline";
            signupLink.style.textDecoration = "";
        } else{
            loginLink.style.textDecoration = "";
            signupLink.style.textDecoration = "underline";
        }
        submitButton.innerText = s;
    }
    async function click(u,p){
        if(stateIn==="Log In"){
            signin(u,p);
 
        } else{
            register(u,p);
        }
    }
    return (
        <main>
            <div>
                
                /*kinda need to get rid of this line cuz its making all the buttons highlight blue and ignore our original css but getting rid of it makes the page go weird*/
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            </div>   
                    
                <div class="gap-4 columns-2">
                    <div>
                        <img class="h-[93vh] w-[50vw]" src="img.png" alt="img.png" />
                    </div>
                        <div className="flex flex-row">
                        <Link id="signupLink" href="" onClick={() => setState("Sign Up")} className="mt-20 mx-52 hover:underline text-3xl text-browns font-mono">Sign up</Link>
                        <Link id="loginLink" href="" onClick={() => setState("Log In")} className="mt-20 -mx-10 hover:underline text-3xl text-browns font-mono">Log in</Link>
                        </div>
                    <div>
                        <img class="mt-5 mx-auto h-[25vh] w-[13vw]" src="owl.png" alt="owl.png" />
                    </div>
                    <div>
                        <div className="flex flex-column">
                            <div class="ml-40 text-xl text-browns font-mono">
                                Username
                            </div>
                            
                        </div>
                    </div>

                    <div>
                        <input id="user" type="text" className="ml-40 flex flex-row border-browns border-2 rounded-lg text-2xl form-control h-15 w-[30vw] p-2" placeholder="Username" />
                    </div>

                    <div>
                        <div class="mt-5 ml-40 text-xl text-browns font-mono">
                            Password
                        </div>
                        <input id = "pass" type="text" className="ml-40 flex flex-row border-browns border-2 rounded-lg text-2xl form-control h-15 w-[30vw] p-2" placeholder="Password" />
                    </div>
                    <div>
                        <p className="mt-8 ml-32 text-md text-browns font-Arial">By clicking Log in, you accept the Quizify!© <b><u>Terms of Service</u></b> and <b><u>Privacy Policy</u></b></p>
                        <button id="submitButton" className="mt-14 ml-40 hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl mt-5 p-2 rounded-lg border-browns bg-btn-100 h-15 w-[30vw] font-mono" onClick={() => click(user.value, pass.value)}>Log In</button>
                    </div>
                </div>
        </main>
    );
}
