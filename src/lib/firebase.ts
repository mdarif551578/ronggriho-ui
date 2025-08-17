// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "TODO: REPLACE WITH YOUR API KEY",
  authDomain: "TODO: REPLACE WITH YOUR AUTH DOMAIN",
  projectId: "TODO: REPLACE WITH YOUR PROJECT ID",
  storageBucket: "TODO: REPLACE WITH YOUR STORAGE BUCKET",
  messagingSenderId: "TODO: REPLACE WITH YOUR MESSAGING SENDER ID",
  appId: "TODO: REPLACE WITH YOUR APP ID",
  measurementId: "TODO: REPLACE WITH YOUR MEASUREMENT ID"
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