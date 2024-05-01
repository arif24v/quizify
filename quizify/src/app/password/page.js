"use client"

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page(  ) {

    const router = useRouter();
    const searchParams = useSearchParams()

    let [password, setPassword] = useState("");

    function handleChange() {
        if (password == searchParams.get("password")) {
            router.push('/sets?id=' + searchParams.get('id'))
        } else {

        }

    }

    return (
        <main className="flex h-[100vh] w-[100vw]">
            <div className="h-[80vh] w-[100vw] flex flex-col justify-center items-center">
                <p className="text-4xl text-center font-mono"> This domain is password protected </p>
                <p className="text-4xl text-center font-mono mt-4"> Please enter the password to enter this domain </p>
                <div className="flex flex-row gap-6 w-full items-center justify-center">
                    <input className="mt-10 w-1/4 rounded-lg p-3 border-2" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                    <button className="mt-10 rounded-lg bg-btn-100 hover:bg-btn-200 p-3" onClick={handleChange}> ENTER </button>
                </div>
            </div>
            

        </main>
    );
}