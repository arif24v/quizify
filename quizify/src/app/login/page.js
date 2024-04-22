export default function Page() {
    return (
        <main>
            <div className="absolute left-100 top-100">
                
                <button onclick={signup("LI")}>Log In</button>
                <button onclick={signup("SU")}>Sign Up</button>
            </div>
            <input type="text" className="rounded-sm border-2 w-full h-7 font-mono text-sm outline-none p-2" placeholder="Username"/>
            <div>
                <img src="imgplaceholder.jpg" width="610" height="720"></img>
            </div>
        </main>
    );
    const s = "LI";
    function signup(sign){
        if(!s.equals(sign)){
            s = sign;
            if(s.equals("LI")){
                
            } else if(s.equals("SU")){

            }
        }
    }
}