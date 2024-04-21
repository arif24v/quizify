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
    
    const [editing, setEditing] = useState();
    const [editableValue, setEditableValue] = useState([]);

    const [deleting, setDeleting] = useState();

    const addCard = async (e) => {
        e.preventDefault();
        if (newCard.term !== "" && newCard.def !== "") {
            setCards([...cards, newCard]);
            setNewCard({term: '', def: ''});
        }
    }

    const addCardTodb = async (e) => {
        e.preventDefault();
        if (title !== "" && description !== "") {
            const docRefMeta = await addDoc(collection(db, "domains"), {
                title: title,
                description: description,
                cards: cards
            })
        }
    }

    function deleteCard(e, index) {
        e.preventDefault();
        const newArray = [...cards.slice(0, index), ...cards.slice(index + 1)];
        setCards(newArray);
        setDeleting(null);
    }

    function editCard(e, index) {
        e.preventDefault();
        if (editing == index) {
            setCards([...cards.slice(0, index), {term:editableValue[0], def:editableValue[1]}, ...cards.slice(index+1)]);
            setEditableValue(["", ""]);
            setEditing(null);
        } else {
            setEditing(index)
            setEditableValue([cards[index].term, cards[index].def]);
        }
        
        /*setEditMode([...editMode.slice(0, index), !editMode[index], ...editMode.slice(index+1)]);
        console.log(editMode);
        if (!editMode[index]) {
            setEditableValue([cards[index].term, cards[index].def]);
        } else {
            setCards([...cards.slice(0, index), {term:editableValue[0], def:editableValue[1]}, ...cards.slice(index+1)]);
            setEditableValue(["", ""]);
        }
        console.log(editMode[index]);*/
    }

    /*useEffect(() => {
        const q = query(collection(db, 'cards'))
        const unsubscribe = onSnapshot(q, (querySnapshot) =>  {
            let cardsArr = [];

            querySnapshot.forEach((doc) => {
                cardsArr.push({...doc.data(), id: doc.id})
            })
            setCards(cardsArr);
        })

        return unsubscribe
    }, [])*/

    const handleChange = () => {
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
                                <button className="font-mono text-black bg-white hover:bg-gray-300 ease-in-out duration-100 pl-3 pr-3 mr-4 rounded-md" onClick={(e) => editCard(e, id)}> {editing == id ? "DONE EDITING" : "EDIT"} </button>
                                <button className="font-mono text-black bg-red-500 hover:bg-red-400 ease-in-out duration-100 pl-3 pr-3 rounded-md" onClick={(e) => setDeleting(id)/*deleteCard(e, id)*/}> DELETE </button>
                            </div>
                            { editing == id ? (
                                <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> TERM: </p>
                                    <input type="text" className = "outline-none border-b-4 bg-amber-500 text-amber-700 font-mono flex flex-row text-lg m-5 w-1/2" onChange={(e) => setEditableValue([e.target.value /*TERM: */, editableValue[1]])} value={editableValue[0]} />
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> DEF: </p>
                                    <input type="text" className = "outline-none border-b-4 bg-amber-500 text-amber-700 font-mono flex flex-row text-lg m-5 w-1/2" onChange={(e) => setEditableValue([editableValue[0], e.target.value /*DEF: */])} value={editableValue[1]} />
                                </div>
                            ) :  (
                                <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> TERM: </p>
                                    <div className = "flex flex-row text-lg m-5 w-1/2"> {card.term}</div>
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> DEF: </p>
                                    <div className = "flex flex-row text-lg m-5 w-1/2"> {card.def}</div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
            <div className="m-3">
                <button onClick={addCardTodb} className="font-mono text-xl flex justify-center align-center w-full p-2 hover:bg-amber-600 bg-amber-700 rounded-md ease-in-out duration-100"> FINISH </button>
            </div>

                { deleting != null && 
                            <div className={"backdrop-blur-lg fixed inset-0 bg-opacity-25 flex justify-center items-center"}>
                                <div className="bg-gray-100 text-black h-[40vh] w-[40vw] rounded-xl flex flex-col text-center justify-center items-center"> 
                                    <p className="flex flex-col text-3xl p-7 font-mono">ARE YOU SURE YOU WANT TO DELETE THIS ITEM?</p>
                                    <div className="flex flex-row mt-5">
                                        <button onClick = {(e) => setDeleting(null)} className="hover:bg-gray-400 ease-in-out duration-150 rounded-lg font-mono bg-gray-300 p-3 flex flex-row m-3">
                                            Cancel
                                        </button>
                                        <button onClick={(e) => deleteCard(e, deleting)} className="hover:bg-red-700 ease-in-out duration-150 rounded-lg font-mono bg-red-600 p-3 flex flex-row m-3">
                                            DELETE
                                        </button>
                                    </div>
                                </div>        
                            </div>
                }
            
        </main>
    );
}