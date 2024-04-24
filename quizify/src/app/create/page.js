"use client"

import { collection, addDoc, getDoc, query, onSnapshot } from "firebase/firestore" 
import React, { useState, useEffect } from 'react'
import { db, imagedb } from "../firebase"
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage"

import { AnimatePresence, motion } from "framer-motion"
import { Link } from "next/link"
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const [cards, setCards] = useState([
        
    ]);
    const [newCard, setNewCard] = useState({term: '', def: ''});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [passwordBool, setPasswordBool] = useState(false);
    
    const [editing, setEditing] = useState();
    const [editableValue, setEditableValue] = useState([]);

    const [deleting, setDeleting] = useState();

    const [uploading, setUploading] = useState(false);
    const [replacing, setReplacing] = useState(-1);
    let [images, setImages] = useState([]);
    let [currentImage, setCurrentImage] = useState();

    const addTodb = async (e) => {
        e.preventDefault();
        if (cards.length != 0) {
            if (title !== "" && description !== "") {
                const urls = await Promise.all(images.map(async (image, id) => {
                    if (image != null) {
                        const imgRef = ref(imagedb, `files/${v4()}`)
                        await uploadBytes(imgRef, image);
                        return getDownloadURL(imgRef);
                    } else {
                        return null;
                    }
                }));
                await addFields(urls);
                router.push("/");
            }
        }
    }

    async function addFields(urls) {
        const cardsWithURLs = cards.map((card, index) => ({
            ...card,
            imageUrl: urls[index]
        }));
    
        const docRefMeta = await addDoc(collection(db, "domains"), {
            title: title,
            description: description,
            cards: cardsWithURLs,
            imageURLs: urls
        });
        console.log("Document added with images:", docRefMeta.id);
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
    }

    const addCard = async (e) => {
        e.preventDefault();
        if (newCard.term !== "" && newCard.def !== "") {
            setCards([...cards, newCard]);
            setNewCard({term: '', def: ''});
            if (currentImage != null) {
                setImages([...images, currentImage]);
                setCurrentImage(null);
            } else {
                setImages([...images, null]);
            }
        }
    }


    const handleChange = () => {
        setPasswordBool(!passwordBool);
    };

    function handleFileUpload(e) {
        e.preventDefault();
        setCurrentImage(e.target.files[0]);
        setUploading(false);
    }

    function handleReplacement(e) {
        e.preventDefault();
        setImages([...images.slice(0, replacing), e.target.files[0], ...images.slice(replacing+1)]);
        setReplacing(-1);
    }

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
                    <button className = "m-2 rounded-md bg-amber-600 hover:bg-amber-700 ease-in-out duration-100 font-mono text-lg align-center p-2" onClick={() => setUploading(true)}> 
                        {currentImage == null ? 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                            ) : 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                            )
                        }
                    </button>
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
                                {   images[id] && (
                                    <div className="font-mono text-black bg-cyan-300 ease-in-out duration-100 pl-3 pr-3 mr-4 max-w-32 overflow-hidden rounded-md">
                                        <div className="font-mono text-black bg-cyan-300 ease-in-out duration-100 overflow-hidden rounded-md text-nowrap"> {images[id].name} </div>
                                    </div>
                                )}
                                <button className="font-mono text-black bg-white hover:bg-gray-300 ease-in-out duration-100 pl-3 pr-3 mr-4 rounded-md" onClick={(e) => editCard(e, id)}> {editing == id ? "DONE EDITING" : "EDIT"} </button>
                                <button className="font-mono text-black bg-red-500 hover:bg-red-400 ease-in-out duration-100 pl-3 pr-3 rounded-md" onClick={(e) => setDeleting(id)}> DELETE </button>
                            </div>
                            { editing == id ? (
                                <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> TERM: </p>
                                    <textarea type="text" style={{ overflowWrap: 'break-word' }} className = "outline-none border-b-4 bg-amber-500 text-amber-700 font-mono flex flex-row text-lg m-5 w-1/2" onChange={(e) => setEditableValue([e.target.value, editableValue[1]])} value={editableValue[0]} />
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5"> DEF: </p>
                                    <textarea type="text" style={{ overflowWrap: 'break-word' }} className = "outline-none border-b-4 bg-amber-500 text-amber-700 font-mono flex flex-row text-lg m-5 w-1/2" onChange={(e) => setEditableValue([editableValue[0], e.target.value])} value={editableValue[1]} />
                                    
                                    <button className = "m-2 rounded-md bg-amber-600 hover:bg-amber-700 ease-in-out duration-100 font-mono text-lg align-center p-2" onClick={() => setReplacing(id)}> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-12 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            ) :  (
                                <div className = "flex flex-row w-full font-mono text-amber-700 bg-amber-500 rounded-b-md">
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5 min-w-14"> TERM: </p>
                                    <p className = "flex flex-row text-lg m-5 w-1/2 break-all"> {card.term}</p>
                                    <p className="flex flex-row text-lg ml-5 mt-5 mb-5 min-w-14"> DEF: </p>
                                    <p className = "flex flex-row text-lg m-5 w-1/2 break-all"> {card.def}</p>
                                </div>
                            )}
                            
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
            <div className="m-3">
                <button onClick={addTodb} className="font-mono text-xl flex justify-center align-center w-full p-2 hover:bg-amber-600 bg-amber-700 rounded-md ease-in-out duration-100"> FINISH </button>
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
                { uploading && 
                    <div className={"backdrop-blur-lg fixed inset-0 bg-opacity-25 flex justify-center items-center"}>
                        <div class="flex items-center justify-center w-full h-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-1/2 h-1/2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    
                                    
                                </div>
                                <button onClick = {(e) => setUploading(null)} className=" hover:bg-gray-400 ease-in-out duration-150 rounded-lg font-mono bg-gray-300 p-3 flex flex-row m-3">
                                        Cancel
                                </button>
                                <input id="dropzone-file" type="file" class="hidden" onChange={(e) => handleFileUpload(e)}/>
                            </label>
                        </div> 
                    </div>
                }
                { replacing != -1 && 
                    <div className={"backdrop-blur-lg fixed inset-0 bg-opacity-25 flex justify-center items-center"}>
                        <div class="flex items-center justify-center w-full h-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-1/2 h-1/2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    
                                    
                                </div>
                                <button onClick = {(e) => setReplacing(-1)} className=" hover:bg-gray-400 ease-in-out duration-150 rounded-lg font-mono bg-gray-300 p-3 flex flex-row m-3">
                                        Cancel
                                </button>
                                <input id="dropzone-file" type="file" class="hidden" onChange={(e) => handleReplacement(e)}/>
                            </label>
                        </div> 
                    </div>
                }
        </main>
    );
}