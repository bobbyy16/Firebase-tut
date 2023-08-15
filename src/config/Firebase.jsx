import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkc-htF-UWeKY1vzgqFVags9mTNVR478s",
  authDomain: "fir-course-26329.firebaseapp.com",
  projectId: "fir-course-26329",
  storageBucket: "fir-course-26329.appspot.com",
  messagingSenderId: "984718911683",
  appId: "1:984718911683:web:2166f91063b9cc2cf8da76",
  measurementId: "G-LHZBRKFTP8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
