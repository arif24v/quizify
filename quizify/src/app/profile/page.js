//import profile from "./../../../../public/profile.jpg"

export default function Page() {
    return (
        <main>
            <p class="mt-8 mb-10 text-7xl text-center font-mono"> PROFILE </p>
            <div class="gap-4 columns-2">
                <div>
                    <img class="ml-20 h-30 w-30 rounded-full" src= "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile.jpg" />
                </div>
                <div>
                    <p class="text-5xl text-brown font-mono">
                        Username:
                    </p> 
                </div>
                <div>

                </div>
                <div>
                    <input type="text" class="form-control mt-8 h-10 w-70" id="inputPass" placeholder="yuvi gawande"></input>
                </div>
                <div>

                </div>
                <div>
                    <p class="mt-5 text-5xl text-brown font-mono">
                        Password:
                    </p>
                </div>
            </div>
        </main>
    );
}