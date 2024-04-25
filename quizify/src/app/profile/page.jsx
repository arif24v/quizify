//import profile from "./../../../../public/profile.jpg"

export default function Page() {
    return (
        <main>
            <p class="mt-8 mb-10 text-7xl text-center"> Profile </p>
            <div class="gap-4 columns-2">
                <div>
                    <img class="ml-20 h-30 w-30 rounded-full" src= "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg" alt="profile.jpg" />
                </div>
                <div>
                    <p class="text-5xl">
                        Username:
                    </p> 
                </div>
                <div>

                </div>
                <div>
                    <input type="text" class="form-control" id="inputPass" placeholder=""></input>
                </div>
            </div>
        </main>
    );
}