"use client"

import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import { AnimatePresence, motion } from "framer-motion"

export default function Page() {

    const [cards, setCards] = useState([
        
    ]);
    const [newCard, setNewCard] = useState({term: '', def: ''});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [passwordBool, setPasswordBool] = useState(false);

    const addCard = async (e) => {
        e.preventDefault();
        if (newCard.term !== "" && newCard.def !== "") {
            setCards([...cards, newCard]);
            /*const docRef = await addDoc(collection(db, "cards"), {
                term: newCard.term.trim(),
                def: newCard.def.trim()
            });*/
            setNewCard({term: '', def: ''});
        }
    }

    const addCardTodb = async (e) => {
        e.preventDefault();
        if (title !== "" && description !== "") {
            const docRefMeta = await addDoc(collection(db, "domains"), {
                title: title,
                description: description
            })
            const docRefCards = collection(db, 'domains', docRefMeta.id, 'cards');
            cards.map(async (card) => {
                const docRef = await addDoc(docRefCards, {
                    term: card.term.trim(),
                    def: card.def.trim()
                })
            })
        }
    }

    function deleteCard(e, index) {
        e.preventDefault();
        const newArray = [...cards.slice(0, index), ...cards.slice(index + 1)];
        setCards(newArray);
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

        return unsubscribe
    }, [])

    const handleChange = () => {
        console.log(passwordBool);
        setPasswordBool(!passwordBool);
    };

    return (
        <main>
            <div className="flex flex-col bg-amber-400 p-3 m-3 rounded-md">
                <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 m-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-600 text-yellow-600" onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
                <div className="flex flex-row w-full">
                    <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 m-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-600 text-yellow-600" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" />
                    <div className="flex-1" />
                    <input type="checkbox" onChange={handleChange} className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"></input>
                    {passwordBool && (
                        <input type="text" className="h-full focus:text-lg ease-in-out duration-200 flex flex-col font-mono w-5/12 mr-16 ml-2 mt-3 mb-3 bg-transparent outline-none border-b-4 border-b-yellow-600 pl-1 placeholder-amber-600 text-yellow-600" placeholder="Password" />
                    )}
                    {!passwordBool && (
                        <div className="flex-1" />
                    )}
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
                    <button className = "m-2 rounded-md bg-amber-600 hover:bg-amber-700 ease-in-out duration-100 font-mono text-lg align-center p-2" onClick={addCard}> Add </button>
                </div>
            </div>
            {cards.map((card, id) => (
                <AnimatePresence>
                    <motion.div
                        initial={{ y: -100, height: 0, opacity: 0 }}
                        animate={{ y: 0, height: 'auto', opacity: 1 }}
                        exit={{ y: -100, height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="m-3">
                            <div className = "w-full bg-amber-500 mb-1 rounded-t-md flex flex-row p-3"> 
                                <div className="font-mono text-amber-700"> {id} </div>
                                <div className="flex-1" />
                                <button className="font-mono text-black bg-red-500 hover:bg-red-400 ease-in-out duration-100 pl-3 pr-3 rounded-md" onClick={(e) => deleteCard(e, id)}> DELETE </button>
                            </div>
                            <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                                <div className = "flex flex-row text-lg m-5 w-1/2"> TERM: {card.term}</div>
                                <div className = "flex flex-row text-lg m-5 w-1/2"> DEF: {card.def}</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
            <div className="m-3">
                <button onClick={addCardTodb} className="font-mono text-xl flex justify-center align-center w-full p-2 hover:bg-amber-600 bg-amber-700 rounded-md ease-in-out duration-100"> FINISH </button>
            </div>
        </main>
    );
}