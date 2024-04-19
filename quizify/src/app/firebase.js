// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXcWSpDtCVtzFfCUcgm1f0fR_GsGxda4A",
  authDomain: "quiz-52ae4.firebaseapp.com",
  projectId: "quiz-52ae4",
  storageBucket: "quiz-52ae4.appspot.com",
  messagingSenderId: "624244774274",
  appId: "1:624244774274:web:cd8939e5709682c89d2b9b",
  measurementId: "G-7RP3NKVMY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);