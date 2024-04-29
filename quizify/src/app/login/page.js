"use client"

import { useState } from "react";
import ReactDOM from "react-dom/client";
import Link from "next/link"
import { getFirestore, collection, addDoc } from 'firebaseLogin/firestore';
import { doc, getDoc } from "firebaseLogin/firestore";
export default function Page() {
const logins = collection(db, 'logins');
const loginData = {
    user: 'username',
    pass: 'pass'
};
const newDocRef = addDoc(logins, loginData);
console.log('New document added with ID:', newDocRef.id);
async function register(u, p){
    //check for duplicate usernames
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) { //duplicate
        return true;
    } else{
        const loginData = {
            user: u,
            pass: p
        };
        const newDocRef = await addDoc(logins, loginData);
        console.log('New document added with ID:', newDocRef.id);
        return false;
    }
}
async function signin(u,p){
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()&&docSnap.pass===p) { //success
        return true;
    } else{
        alert("Username or password is incorrect");
    }
}
    const [stateIn, setState] = useState("Log In");
    async function onclick(u,p){
        if(inputUser.value!==""&&inputPass.value!==""){
            if(state="L"){ //log in
                signin(u,p);
            } else{ //signup
                if(register(u,p)){
                    alert("Username is taken!");
                }
            }
        }
    }
    
    return (
        <main>
            <div>
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
                            <div class="form-group h-[7vw]">
                                <label for="inputPass" class="h4">Password</label>
                                <input type="text" class="form-control" id="inputPass" placeholder="Password"></input>
                            </div>
                            <a href="/" class="btn btn-info" role="button">{stateIn}</a>
                        </form>
                    </div>
                </div>
            </div>}
        </main>
    );
}
