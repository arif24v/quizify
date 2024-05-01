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
            <div className="text-3xl font-mono text-black m-3"> RECENT </div>
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
                <Link className="hover:underline" href="/library"> Browse More </Link>&nbsp; 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex justify-end w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

            </div>

            <div class="container px-6 py-10 mx-auto">
                <h1 class="text-3xl font-mono text-black m-3"> Explore our Awesome <span class="underline decoration-btn-200">Features</span>!</h1>
                
                <p class="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Quizify is the answer to all your study needs. Use great study sets to whisk those test worries away!
                </p>
        
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div class="p-8 space-y-3 border-2 border-btn-200 rounded-xl">
                        <span class="inline-block text-btn">
                        <svg class="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <path d="M12 3a4.5 4.5 0 0 0 0 9a4.5 4.5 0 0 1 0 9" />  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />  <circle cx="12" cy="16.5" r=".5" fill="currentColor" /></svg>
                    
                        </span>

                    <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Calming UI</h1>

                    <p class="text-gray-500 dark:text-gray-300">
                        We purposefully chose the theme of our website to ensure that it is pleasant and relaxing to look at. No need to add on more stresses. Our website is simple and easy to use. We know you're already frustrated enough with the topics you're studying. This isn't rocket science!
                    </p>

                    <a href="#" class="inline-flex p-2 text-btn-200 capitalize transition-colors duration-200 transform bg-btn rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
            </div>

            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                <span class="inline-block text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Easy to customiztions</h1>

                <p class="text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                </p>

                <a href="#" class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
            </div>

            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                <span class="inline-block text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Simple & clean designs</h1>

                <p class="text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                </p>

                <a href="#" class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
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