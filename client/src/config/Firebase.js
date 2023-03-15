import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "newbuda-98303.firebaseapp.com",
    projectId: "newbuda-98303",
    storageBucket: "newbuda-98303.appspot.com",
    messagingSenderId: "428625789897",
    appId: "1:428625789897:web:1739e43d9a60893c375e18",
    measurementId: "G-86STPEEFXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)