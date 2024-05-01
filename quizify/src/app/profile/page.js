"use client"

//import profile from "./../../../../public/profile.jpg"
import React, {useState} from 'react';

export default function Page() {

    let [disabledUsername, setDisabledUsername] = useState(true);
    let [disabledPassword, setDisabledPassword] = useState(true);

    return (
        <main>
            <p class="mt-8 mb-10 text-5xl text-center font-mono"> PROFILE </p>
            <div class="gap-4 columns-2">
                <div>
                    <img class="border-btn-200 border-4 ml-40 h-15 w-15 rounded-full" src= "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile.jpg" />
                </div>
                <div>
                    <p class="text-3xl text-brown font-mono">
                        Username:
                    </p> 
                </div>
                <div>

                </div>
                <div className="flex flex-row">
                    <input type="text" disabled={disabledUsername} className="flex flex-row border-btn-200 border-2 rounded-lg text-2xl form-control mt-5 h-12 w-70 p-2" id="inputPass" placeholder="JohnDoe69" />
                    <button className="hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl ml-5 mt-5 p-2 rounded-lg bg-btn-100 h-12 w-20 font-mono" onClick={() => setDisabledUsername(!disabledUsername)}>{disabledUsername ? "Edit" : "Save"}</button>
                </div>
                <div>

                </div>
                <div>
                    <p class="mt-12 text-3xl text-brown font-mono">
                        Password:
                    </p>
                </div>
                <div>
                </div>

                <div className="flex flex-row">
                    <input type="text" disabled={disabledPassword} className="flex flex-row border-btn-200 border-2 rounded-lg text-2xl form-control mt-5 h-12 w-70 p-2" id="inputPass" placeholder="Vampires" />
                    <button className="hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl ml-5 mt-5 p-2 rounded-lg border-black bg-btn-100 h-12 w-20 font-mono" onClick={() => setDisabledPassword(!disabledPassword)}>{disabledPassword ? "Edit" : "Save"}</button>
                </div>
            </div>
        </main>
    );
}