"use client"

//import profile from "./../../../../public/profile.jpg"
import React, { useState } from 'react';

export default function Page() {

    let [disabledUsername, setDisabledUsername] = useState(true);
    let [disabledPassword, setDisabledPassword] = useState(true);
    

    return (
        <main>
            <p class="mt-8 mb-10 text-5xl text-center font-mono"> PROFILE </p>
            <div class="gap-4 columns-2">
                <div>
                    <img class="border-btn-200 border-4 ml-40 h-30 w-30 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile.jpg" />
                </div>
                <div>
                    <p class="text-3xl text-brown font-mono">
                        Username:
                    </p>
                </div>
                <div>

                </div>
                <div className="flex flex-row">
                    <input type="text" disabled={disabledUsername} className="flex flex-row border-btn-200 border-2 rounded-lg text-3xl form-control mt-5 h-16 w-70 p-2" id="inputPass" placeholder="JohnDoe69" />
                    <button className="hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl ml-5 mt-5 p-2 rounded-lg border-black bg-btn-100 h-16 w-20 font-mono border-2" onClick={() => setDisabledUsername(!disabledUsername)}>{disabledUsername ? "Edit" : "Save"}</button>
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
                    <input type="text" disabled={disabledPassword} className="flex flex-row border-btn-200 border-2 rounded-lg text-3xl form-control mt-5 h-16 w-70 p-2" id="inputPass" placeholder="Vampires" />
                    <button className="hover:shadow-md hover:bg-btn-200 hover:shadow-btn-200 ease-in-out duration-200 text-2xl ml-5 mt-5 p-2 rounded-lg border-black bg-btn-100 h-16 w-20 border-2 font-mono" onClick={() => setDisabledPassword(!disabledPassword)}>{disabledPassword ? "Edit" : "Save"}</button>
                    <button className="mt-5 ml-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
