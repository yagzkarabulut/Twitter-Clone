// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaoqltNwXNo9pyLOmwUbrnTjiQZs8Lf0U",
  authDomain: "twitter-6e7a9.firebaseapp.com",
  projectId: "twitter-6e7a9",
  storageBucket: "twitter-6e7a9.appspot.com",
  messagingSenderId: "475040244847",
  appId: "1:475040244847:web:eba20bfbc35e84f261d99a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// girebase uatun referansını alma
export const auth = getAuth(app);

//google sağlayıcını kurma
export const provider = new GoogleAuthProvider();

// veri tabanını referansı alma
export const db = getFirestore(app);

// dosya yükleme alanın refransını al
export const storage = getStorage(app);
