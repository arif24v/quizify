"use client"

import { useState, useEffect } from "react"
import { collection, doc, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import { db } from "./../firebase.js"
import { useSearchParams, useRouter } from "next/navigation";
import Domain from "./../components/domains/domain.js";


export default function SearchResults() {

    const router = useRouter();
    const searchParams = useSearchParams();

    let [allDomains, setAllDomains] = useState([]);
    let [matchingDomains, setMatchingDomains] = useState([]);

    function searchByTerm() {
        allDomains.map((domain) => {
            const termsArr = searchParams.get("searchTerm").split();
            let isIncluded = false;
            termsArr.map((str) => {
                if (!isIncluded && domain.title.includes(str)) {
                    setMatchingDomains([...matchingDomains, domain]);
                    isIncluded = true;
                }
            })
        })
       
    }

    useEffect (() =>{
        setMatchingDomains([]);
        setAllDomains([]);
        const q = query(collection(db, 'domains'))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>  {
            let domainsArr = [];

            querySnapshot.forEach((doc) => {
                domainsArr.push({...doc.data(), id: doc.id})
            })
            setAllDomains(domainsArr);
        })

        searchByTerm();

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

    return (
        <main>
            <div className="m-5 text-5xl">
                SHOWING RESULTS FOR "{searchParams.get("searchTerm")}"
            </div>

            {chunkArray(matchingDomains, 4).map((row, rowIndex) => (
                <div className="flex flex-row w-full pr-6">
                    {row.map((domain) => (
                        <div className="w-1/4 p-4">
                            <Domain title={domain.title} description={domain.description} author={domain.id} password={domain.password} />
                        </div>
                    ))}
                </div>
            ))}



        </main>
    );
}