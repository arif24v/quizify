import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDXcWSpDtCVtzFfCUcgm1f0fR_GsGxda4A",
    authDomain: "quiz-52ae4.firebaseapp.com",
    projectId: "quiz-52ae4",
    storageBucket: "quiz-52ae4.appspot.com",
    messagingSenderId: "624244774274",
    appId: "1:624244774274:web:cd8939e5709682c89d2b9b",
    measurementId: "G-7RP3NKVMY4"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const logins = collection(db, 'logins');
const loginData = {
    user: 'username',
    pass: 'pass'
};
const newDocRef = await addDoc(logins, loginData);
console.log('New document added with ID:', newDocRef.id);
async function register(u, p){
    //signing up, CHECK FOR DUPLICATE USERNAMES
    const docRef = doc(db, 'logins', u);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) { //duplicate
        return true;
    } else{
        const loginData = {
            user: u,
            pass: p
        };
        const newDocRef = await addDoc(logins, loginData);
        console.log('New document added with ID:', newDocRef.id);
        return false;
    }
}
async function signin(u,p){
    //logging in
}
    
let state = "L";
async function onclick(u,p){
    if(inputUser.value!==""&&inputPass.value!==""){
        if(state="L"){ //log in
            signin(u,p);
        } else{ //signup
            if(register(u,p)){
                alert("Username is taken!");
            }
        }
    }
}
async function switchMethod(m){
    console.log("test");
    if(!m===state){
        if(m==="L"){
            console.log("logging in");
            state = "L";
            title.innerText="Log In";
        } else{
            console.log("signing up");
            state = "S";
            title.innerText="Sign Up";
        }
    }
}
export default function Page() {
    return (
        <main>
            <div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            </div>   
            {<div>
                <div className="flex flex-row w-full l-[50vw]">
                    <div className="w-[45vw] h-[100vh] flex flex-row">
                        <img src="books.jpg" className="w-full h-full" />
                    </div>
                    <div>
                        <div class="h-[4vw]">
                            <button class="btn btn-link position-absolute start-[60vw] " type="button" onclick={switchMethod("L")}>Log In</button>
                            <button class="btn btn-link position-absolute start-[80vw]" type="button" onclick={switchMethod("S")}>Sign Up</button>
                        </div>
                        
                        <form className="flex flex-col position-absolute start-[60vw]">
                        
                            <div class="mx-auto">
                                <img src="owl.png" className="w-[7vw] h-[8vw] mx-auto" />
                                <h1 class="display-4 h-[10vw]" id="title">Log In</h1> 
                            </div>
                            <div class="form-row align-items-center">
                                <label for="inputUser" class="h4">Username</label>
                                <input type="text" class="form-control" id="inputUser" placeholder="Username"></input>
                            </div>
                            <div class="h-[2vw]"></div>
                            <div class="form-group h-[7vw]">
                                <label for="inputPass" class="h4">Password</label>
                                <input type="text" class="form-control" id="inputPass" placeholder="Password"></input>
                            </div>
                            <button onclick={onclick(inputUser.value, inputPass.value)}type="submit" class="m-2 rounded-md bg-beige hover:bg-tan ease-in-out duration-100 font-mono text-lg align-center p-2" id="submit">Sign in</button>
                            
                        </form>
                    </div>
                </div>
            </div>}
        </main>
    );
}



