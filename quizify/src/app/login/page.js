"use client"
import app from './../firebaseLogin.js';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, setDoc, getDocs, getDoc} from "firebase/firestore";
import { db } from "./../firebaseLogin.js"
export default function Page() {
async function register(u, p){
    let exist = false;
    //check for duplicate usernames
    collection("logins").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if(doc.user===u){
                exist = true;
            }
        });
    });
    if (exist) { //duplicate
        alert("Username is taken");
    } else{
        await addDoc(doc(db, 'logins', u), {
            user: u,
            pass: p,
          });
        console.log('new user');
        window.history.pushState("http://localhost:3000");
    }
}
async function signin(u,p){
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()&&docSnap.data.pass===p) { //success
        console.log("logged in");
        window.history.pushState("http://localhost:3000");
    } else{
        alert("Username or password is incorrect");
    }
}
    const [stateIn, setState] = useState("Log In");
    async function click(u,p){
        if(stateIn==="Log In"){
            signin(u,p);
 
        } else{
            register(u,p);
        }
    }
    return (
        <main>
            {<div>
                {
                    
                <div class="gap-4 columns-2">
                    <div>
                        <img class="h-[93vh] w-[50vw]" src="img.png" alt="img.png" />
                    </div>
                        <div className="flex flex-row">
                        <Link href="" onClick={() => setState("Sign Up")} className= "mt-20 mx-52 hover:underline text-3xl text-browns font-mono">Sign up</Link>
                        <Link href="" onClick={() => setState("Log In")} id="login" className="mt-20 -mx-10 hover:underline text-3xl text-browns font-mono">Log in</Link>
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
                        <button className="mt-14 ml-40 hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl mt-5 p-2 rounded-lg border-browns bg-btn-100 h-15 w-[30vw] font-mono" onClick={() => click(user.value, pass.value)}>{stateIn}</button>
                    </div>
                </div>
                }
            </div>}
        </main>
    );
}
