import React, {useState} from 'react';

export default function Modal( {  }) {

    let [hidden, setHidden] = useState(false);

    return (
        <div className={hidden ? "hidden": "" + "fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center"}>
            <div className="bg-gray-100 text-black h-[40vh] w-[40vw] rounded-xl flex flex-col text-center justify-center items-center"> 
                <p className="flex flex-col text-3xl p-7 font-mono">ARE YOU SURE YOU WANT TO DELETE THIS ITEM?</p>
                <div className="flex flex-row mt-5">
                    <button onClick = {(e) => setHidden(true)} className="hover:bg-gray-400 ease-in-out duration-150 rounded-lg font-mono bg-gray-300 p-3 flex flex-row m-3">
                        Cancel
                    </button>
                    <button  className="hover:bg-red-700 ease-in-out duration-150 rounded-lg font-mono bg-red-600 p-3 flex flex-row m-3">
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}