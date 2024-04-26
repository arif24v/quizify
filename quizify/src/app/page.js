"use client"

import Domain from "./components/domains/domain.js";
import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db } from "./firebase"
import Link from "next/link"

import profile from "./../../public/profile.png"

export default function Home() {

    let [domains, setDomains] = useState([]);
    let [selectDomains, setSelectDomains] = useState([]);
    

    useEffect(() => {
        
        const q = query(collection(db, 'domains'))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>  {
            let domainsArr = [];

            querySnapshot.forEach((doc) => {
                domainsArr.push({...doc.data(), id: doc.id})
            })
            setDomains(domainsArr);
            const randomIndexes = getRandomIndexes(4, domainsArr.length); // how many random domains to show
            const selectedDomains = randomIndexes.map(index => domainsArr[index]);
            setSelectDomains(selectedDomains);
        })
        return unsubscribe
    }, [])

    const chunkArray = (array, size) => {
        if (!array) return [];
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const getRandomIndexes = (count, max) => {
        const indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * max);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    };


    return (
        <main>
            <div className="text-3xl font-mono text-black m-3"> RANDOM ASSORTMENT </div>
            {chunkArray(selectDomains, 4).map((row, rowIndex) => (
                <div className="flex flex-row w-full pr-6">
                    {row.map((domain) => (
                        <div className="w-1/4 p-4">
                            <Domain title={domain.title} description={domain.description} author={domain.id} />
                        </div>
                    ))}
                </div>
            ))}
            <div className="justify-end text-right flex flex-row font-mono text-black mr-8"> 
                <Link className="hover:underline" href="/"> Browse More </Link>&nbsp; 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex justify-end w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

            </div>
        </main>
    );
}