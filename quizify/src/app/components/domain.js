export default function Domain(props) {
    return (
        <div className = "rounded-lg border-2 border-gray-400 w-full bg-yellow-400 p-4" >
            <div className="text-lg font-mono text-black"> 
                {props.title}
            </div>
            <div className="text-md font-mono text-black pt-3">
                {props.description}
            </div>
            <div className="text-md font-mono text-black pt-3 flex flex-row">
                <div className = "flex flex-row flex-1" />
                <div className = "flex flex-row pr-3"> PFP </div>
                <div className = "flex flex-row"> {props.author} </div>
            </div>
        </div>
    );
}