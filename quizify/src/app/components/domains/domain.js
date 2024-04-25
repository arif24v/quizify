import Link from "next/link"


export default function Domain(props) {
    
    return (
        <Link href={'/sets?id=' + props.author}>
            <div className = "rounded-lg border-2 border-black w-full bg-gray p-4 m-3 ease-in-out duration-200 hover:cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:shadow-btn-200" >
                <div className="text-lg font-mono text-black overflow-hidden text-ellipsis"> 
                    {props.title}
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