import Link from "next/link"
import Image from 'next/image'

import profile from "./../../../../public/profile.png"

export default function Home() {
    return (
        <main>
            <div className = "bg-btn w-full flex flex-row gap-12 h-16 items-center justify-center p-8 sticky top-0">
                <Link className="text-4xl text-brown justify-center" href="/"> QUIZIFY!</Link>
                <div className="flex flex-row max-md:hidden gap-8">
                    <Link className = "hover:underline text-brown font-mono" href="/create"> Create </Link>
                    <Link className = "hover:underline whitespace-nowrap text-brown font-mono" href="/library"> Library </Link>
                </div>
                
                <div className="flex flex-row w-1/2" data-twe-input-wrapper-init data-twe-input-group-ref>
                    <input type="search" className="rounded-sm border-2 w-full h-7 font-mono text-sm outline-none p-2" placeholder="Search domains..."/>
                    <button
                        className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-silver px-5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-btn-200 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        type="button"
                        id="button-addon1">
                        <span className="[&>svg]:h-5 [&>svg]:w-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor">
                                    <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="flex-1" />
                <Link className = "hover:underline text-brown font-mono whitespace-nowrap" href="/login">Sign In/Register</Link>
                <div>
                    <button className="block md:hidden">
                        <svg className = "w-5 h-5" xlmns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <Link href="/profile">
                    <img className="rounded-full w-11 h-11" src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                </Link>
            </div>
            <div className=" flex flex-col w-full h-1 bg-slate-300" />
            

        </main>
    );
}