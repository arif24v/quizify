"use client"

import React, { useState, useEffect } from 'react'
import { db } from "./../firebase"
import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore"
import Domain from "./../components/domains/domain.js";


export default function Page() {

    let [domains, setDomains] = useState([]);

    const chunkArray = (array, size) => {
        if (!array) return [];
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    useEffect(() => {

        const q = query(collection(db, 'domains'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let domainsArr = [];

            querySnapshot.forEach((doc) => {
                domainsArr.push({ ...doc.data(), id: doc.id })
            })
            setDomains(domainsArr);
        })
        return unsubscribe
    }, [])

    return (
        <main>
            <div className="text-3xl font-mono text-black m-3"> Library </div>
            {chunkArray(domains, 4).map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row w-full pr-6">
                    {row.map((domain, num) => (
                        <div key={num} className="w-1/4 p-4">
                            <Domain key={num} title={domain.title} description={domain.description} author={domain.id} password={domain.password} />
                        </div>
                    ))}
                </div>
            ))}

            <footer className="mt-10 bg-gray flex flex-col space-y-10 justify-center">

                <nav className="mt-5 flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <a className="hover:underline" href="/">Home</a>
                    <a className="hover:underline" href="/create">Create</a>
                    <a className="hover:underline" href="/library">Library</a>
                    <a className="hover:underline" href="/login">Login</a>
                    <a className="hover:underline" href="/profile">Profile</a>
                </nav>

                <div className="flex justify-center space-x-5">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                    </a>
                    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
                    </a>
                </div>
                <p className="text-center text-gray-700 font-medium">&copy; 2024 Testerra Inc. All rights reservered.</p>
            </footer>
        </main>
    );
}