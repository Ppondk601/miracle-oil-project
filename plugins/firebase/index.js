``// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZ7Ikfd_Hjwyf0KQUJ_XAfPNL9sgm2ntY",
    authDomain: "fir-test-7bd90.firebaseapp.com",
    projectId: "fir-test-7bd90",
    storageBucket: "fir-test-7bd90.appspot.com",
    messagingSenderId: "546918912282",
    appId: "1:546918912282:web:26deb7ffd1c9eab8e3dca3",
    measurementId: "G-BLSK39MYCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);
//check
console.log("🔥 firebase start ");

export default {
    db,
}