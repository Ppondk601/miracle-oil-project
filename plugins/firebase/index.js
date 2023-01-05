``// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Yd3XfFhsTI1ESY9vTJrwIFf1a3weWq4",
  authDomain: "miracle-oil-store.firebaseapp.com",
  projectId: "miracle-oil-store",
  storageBucket: "miracle-oil-store.appspot.com",
  messagingSenderId: "892365903950",
  appId: "1:892365903950:web:792b2522a19dcb12a5cb1f",
  measurementId: "G-YPJ2YN78B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore
export const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);
//check
console.log("🔥 firebase start ");
