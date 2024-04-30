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
        const unsubscribe = onSnapshot(q, (querySnapshot) =>  {
            let domainsArr = [];

            querySnapshot.forEach((doc) => {
                domainsArr.push({...doc.data(), id: doc.id})
            })
            setDomains(domainsArr);
        })
        return unsubscribe
    }, [])

    return (
        <main>
            <div className="text-3xl font-mono text-black m-3"> Library </div>
            {chunkArray(domains, 4).map((row, rowIndex) => (
                <div className="flex flex-row w-full pr-6">
                    {row.map((domain) => (
                        <div className="w-1/4 p-4">
                            <Domain title={domain.title} description={domain.description} author={domain.id} />
                        </div>
                    ))}
                </div>
            ))}
        </main>
    );
}