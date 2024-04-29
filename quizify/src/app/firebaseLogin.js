// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const loginConfig = {
    apiKey: "AIzaSyBqV3Le10Ho9hqHcRtpR9IJyBDFKViaJuQ",
    authDomain: "quizifylogin.firebaseapp.com",
    databaseURL: "https://quizifylogin-default-rtdb.firebaseio.com",
    projectId: "quizifylogin",
    storageBucket: "quizifylogin.appspot.com",
    messagingSenderId: "434084322199",
    appId: "1:434084322199:web:a9a0ff7141d1579dd4c2d2",
    measurementId: "G-NFM33YG6B0"
  };
  
  // Initialize Firebase
  const app = initializeApp(loginConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);
export const imagedb = getStorage(app);