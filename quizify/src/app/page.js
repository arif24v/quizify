"use client"

import Domain from "./components/domains/domain.js";
import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db } from "./firebase"
import Link from "next/link"
import Banner from "./components/banner/banner.js"

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
            <Banner />
            <div className="mx-auto ml-2 mt-3 mr-2 pl-5 pr-5">
            {chunkArray(selectDomains, 4).map((row, rowIndex) => (
                <div className="flex flex-row w-full pr-6">
                    {row.map((domain) => (
                        <div className="w-1/4 p-4">
                            <Domain title={domain.title} description={domain.description} author={domain.id} password={domain.password} />
                        </div>
                    ))}
                </div>
            ))}
            </div>
            <div className="justify-end text-right flex flex-row font-mono text-black mr-8"> 
                <Link className="hover:underline" href="/library"> Browse More </Link>&nbsp; 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex justify-end w-6 h-6 mr-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

            </div>

            <div class="container px-6 py-10 mx-auto">
                <h1 class="text-3xl font-mono text-black"> Explore our Awesome <span class="underline decoration-btn-200">Features</span>!</h1>
                
                <p class="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Quizify is the answer to all your study needs. Use great study sets to whisk those test worries away!
                </p>
        
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div class="p-8 space-y-3 border-2 border-btn-200 rounded-xl bg-card">
                        <span class="inline-block text-btn-200">
                        <svg class="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <path d="M12 3a4.5 4.5 0 0 0 0 9a4.5 4.5 0 0 1 0 9" />  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />  <circle cx="12" cy="16.5" r=".5" fill="currentColor" /></svg>
                    
                        </span>

                    <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Calming UI</h1>

                    <p class="text-gray-500">
                        We purposefully chose the theme of our website to ensure that it is pleasant and relaxing to look at. No need to add on more stresses. Our website is simple and easy to use. We know you're already frustrated enough with the topics you're studying.
                    </p>

            </div>

            <div class="p-8 space-y-3 border-2 border-btn-200 rounded-xl bg-card">
                <span class="inline-block text-btn-200">
                <svg class="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
</svg>

                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Study Effectively</h1>

                <p class="text-gray-500 dark:text-gray-300">
                   Keep track of the questions you need more help on to help review where you need more help. Choose between answering the definition or the term. Make your own study set today.
                </p>

                <a href="/create" class="inline-flex p-2 text-btn-200 capitalize transition-colors duration-200 transform bg-btn-100 rounded-full hover:underline hover:text-card">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
            </div>

            <div class="p-8 space-y-3 border-2 border-btn-200 rounded-xl bg-card">
                <span class="inline-block text-btn-200">
                <svg class="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>

                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Private Domains</h1>

                <p class="text-gray-500 dark:text-gray-300">
                   You have the option to make your domains private or share them with the world. Set a password so only you and people you allow can use them. View public domains in the Library tab.
                </p>

                <a href="/library" class="inline-flex p-2 text-btn-200 capitalize transition-colors duration-200 transform bg-btn-100 rounded-full hover:underline hover:text-card">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
            
            
            
        </main>
    );
}