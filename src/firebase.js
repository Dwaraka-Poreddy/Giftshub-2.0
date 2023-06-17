// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD526eVqw-qfJckTGKiE-tWCB1MkX4cunI",
  authDomain: "giftshub-2.firebaseapp.com",
  projectId: "giftshub-2",
  storageBucket: "giftshub-2.appspot.com",
  messagingSenderId: "924094911448",
  appId: "1:924094911448:web:1abc14cf5b537c2a6118ad",
  measurementId: "G-5NQJ1NKPFJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fStore = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getDatabase(app);
