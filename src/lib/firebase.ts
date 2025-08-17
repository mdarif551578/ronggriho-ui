// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS_RLSBK07PWx2PQ4dEPauiZTgSPnqcKU",
  authDomain: "ronggriho.firebaseapp.com",
  projectId: "ronggriho",
  storageBucket: "ronggriho.appspot.com",
  messagingSenderId: "1032337393466",
  appId: "1:1032337393466:web:ebe8198d5c559d617e7203",
  measurementId: "G-H2GR4LN9V5",
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
let analytics;

if (typeof window !== 'undefined' && isSupported()) {
  analytics = getAnalytics(app);
}

export { app, firestore, auth, analytics };