
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "dhakai-threads",
  "appId": "1:932531070870:web:87bae6648e3b7bee909fb7",
  "storageBucket": "dhakai-threads.firebasestorage.app",
  "apiKey": "AIzaSyAYxNV1soev0QJ5m8_gz_qykG5a4qBdrLo",
  "authDomain": "dhakai-threads.firebaseapp.com",
  "measurementId": "G-RLZGCTSV9H",
  "messagingSenderId": "932531070870"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const clientFirestore = getFirestore(app);
const auth = getAuth(app);
// Firebase Analytics is disabled to prevent the Installations API error.
// To re-enable, you must ensure the Firebase Installations API is enabled in your Google Cloud project.
const analytics = null;


export { app, clientFirestore, auth, analytics };
