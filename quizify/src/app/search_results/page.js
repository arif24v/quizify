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

    var id = 0;

    function searchByTerm() {
        setMatchingDomains([]);
        allDomains.forEach((domain) => {
            const termsArr = searchParams.get("searchTerm").split(" ");
            let isIncluded = false;
            termsArr.forEach((str) => {
                if (!isIncluded && domain.title.toLowerCase().includes(str.toLowerCase())) {
                    console.log("here");
                    setMatchingDomains(prevMatchingDomains => [...prevMatchingDomains, domain]);
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
                console.log(doc.id);
                domainsArr.push({...doc.data(), id: doc.id})
            })
            setAllDomains([...domainsArr]);
        })

        return unsubscribe
    }, [])

    useEffect(() => {
        searchByTerm();
    }, [allDomains, searchParams])

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
                        <div key={domain.id} className="w-1/4 p-4">
                            <Domain title={domain.title} description={domain.description} author={domain.id} password={domain.password} />
                        </div>
                    ))}
                </div>
            ))}



        </main>
    );
}