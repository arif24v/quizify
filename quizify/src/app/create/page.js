"use client"

import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore"; 
import React, { useState, useEffect } from 'react';
import { db } from "../firebase";

export default function Page() {

    const [cards, setCards] = useState([
        {term: '', def: ''}
    ]);
    const [newCard, setNewCard] = useState({term: '', def: ''});

    const addCard = async (e) => {
        e.preventDefault();
        if (newCard.term !== "" && newCard.def !== "") {
            setCards([...cards, newCard]);
            const docRef = await addDoc(collection(db, "cards"), {
                term: newCard.term.trim(),
                def: newCard.def.trim()
            });
            setNewCard({term: '', def: ''});
        }
    }

    useEffect(() => {
        const q = query(collection(db, 'cards'))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>  {
            let cardsArr = [];

            querySnapshot.forEach((doc) => {
                cardsArr.push({...doc.data(), id: doc.id})
            })
            setCards(cardsArr);
        })
    }, [])

    return (
        <main>
            <div className="font-mono text-5xl justify-center align-center w-full flex m-5 "> CREATE A NEW SET </div>
            
            <div className="flex flex-col">
                <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 m-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-500 text-yellow-600" placeholder="Enter Title" />
                <div className="flex flex-row w-full">
                    <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 m-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-500 text-yellow-600" placeholder="Enter Description" />
                    <div className="flex-1" />
                    <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 mr-16 mt-3 mb-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-500 text-yellow-600" placeholder="Password" />
                </div>
            </div>
            <div className="bg-amber-500 m-3 rounded-md"> 
                <div className="flex flex-row w-full">
                    <input type="text" 
                        className="focus:border-b-4 rounded-md font-mono w-1/2 m-3 bg-transparent outline-none border-2 border-yellow-600 pl-1 placeholder-amber-700 text-amber-800" 
                        placeholder="term" 
                        onChange={(e) => setNewCard({...newCard, term:e.target.value})}
                        value={newCard.term}
                        /> 
                    <input type="text" 
                        className="focus:border-b-4 rounded-md font-mono w-1/2 m-3 bg-transparent outline-none border-2 border-yellow-600 pl-1 placeholder-amber-700 text-amber-800" 
                        placeholder="def" 
                        value={newCard.def}
                        onChange={(e) => setNewCard({...newCard, def:e.target.value})}
                    />
                    <button className = "m-2 rounded-md bg-amber-600 font-mono text-lg align-center p-2" onClick={addCard}> Add </button>
                </div>
            </div>
            {cards.map((card, id) => (
                <div className="m-3">
                    <div className = "w-full bg-amber-500 mb-1 rounded-t-md flex flex-row p-3"> 
                        <div className="font-mono text-amber-700"> {id} </div>
                        <div className="flex-1" />
                        <div className="font-mono text-black bg-red-500 pl-3 pr-3 rounded-md"> DELETE </div>
                    </div>
                    <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                        <div className = "flex flex-row text-lg m-5 w-1/2"> TERM: {card.term}</div>
                        <div className = "flex flex-row text-lg m-5 w-1/2"> DEF: {card.def}</div>
                    </div>
                </div>
            ))}
        </main>
    );
}