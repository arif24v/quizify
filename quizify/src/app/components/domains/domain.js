import Link from "next/link"


export default function Domain(props) {

    const ref = (props.password && props.password !== "") ? {
        pathname: '/password',
        query: {
          password: props.password,
          id: props.author
        }
    } : '/sets?id=' + props.author;

    
    return (
        <Link href={ref} onClick={() => console.log(ref)}
        /*href={'/sets?id=' + props.author}*/>
            <div className = "rounded-lg border-2 border-black w-full bg-gray p-4 m-3 ease-in-out duration-200 hover:cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:shadow-btn-200" >
                <div className="flex flex-row">
                    <div className="text-lg font-mono text-black overflow-hidden text-ellipsis"> 
                        {props.title}
                    </div>
                    <div className="flex-1" />
                    {(props.password && props.password !== "") && 
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                    }
                </div>
                <div className="text-md font-mono text-black pt-3 overflow-hidden text-ellipsis">
                    {props.description}
                </div>
                <div className="text-md font-mono text-black pt-3 flex flex-row">
                    <div className = "flex flex-row flex-1" />
                    <div className = "flex flex-row pr-3"> PFP </div>
                    <div className = "flex flex-row overflow-hidden"> {props.author} </div>
                </div>
            </div>
        </Link>
    );
}