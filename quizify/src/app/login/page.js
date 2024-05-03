"use server"

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"
import { collection, addDoc } from 'firebase/firestore';
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
        location.replace("/");
        return false;
    }
}
async function signin(u,p){
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()&&docSnap.data.pass===p) { //success
        console.log("logged in");
        location.replace("/");
        return true;
    } else{
        alert("Username or password is incorrect");
    }
}
    const [stateIn, setState] = useState("Log In");
    async function onclick(u,p){
        if(inputUser.value!==""&&inputPass.value!==""){
            if(stateIn==="Log In"){ //log in
                signin(u,p);
            } else{ //signup
                register(u,p);
            }
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
                        <img class="h-[93vh] w-[50vw]" src="books.jpg" alt="books.jpg" />
                    </div>
                        <div className="flex flex-row">
                        <Link href="" className="mt-20 ml-40 hover:underline text-3xl text-brown font-mono">Sign up</Link>
                        <Link href="" className="underline mt-20 ml-40 hover:underline text-3xl text-brown font-mono">Log in</Link>
                        </div>
                    <div>
                        <img class="ml-40 h-[25vh] w-[13vw]" src="owl.png" alt="owl.png" />
                    </div>
                    <div>
                        <div class="ml-40 text-2xl text-brown font-mono">
                            Username
                        </div>
                        <input type="text" className="ml-40 flex flex-row border-brown border-2 rounded-lg text-2xl form-control mt-5 h-14 w-80 p-2" placeholder="Username" />
                    </div>

                    <div>
                        <div class="ml-40 text-2xl text-brown font-mono">
                            Password
                        </div>
                        <input type="text" className="ml-40 flex flex-row border-brown border-2 rounded-lg text-2xl form-control mt-5 h-14 w-80 p-2" placeholder="Password" />
                    </div>
                    <div>
                        <p className="mt-10 text-sm ml-20 text-brown font-mono">By clicking Log in, you accept the Quizify!© <b><u>Terms of Service</u></b> and <b><u>Privacy Policy</u></b></p>
                        <button className="ml-40 hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl ml-5 mt-5 p-2 rounded-lg border-brown bg-btn-100 h-16 w-80 font-mono border-2">Log in </button>
                    </div>
                </div>
            </main>
    )
}