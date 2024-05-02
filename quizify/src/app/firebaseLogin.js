// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);