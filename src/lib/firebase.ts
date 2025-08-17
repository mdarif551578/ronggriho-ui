
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported }from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYxNV1soev0QJ5m8_gz_qykG5a4qBdrLo",
  authDomain: "dhakai-threads.firebaseapp.com",
  projectId: "dhakai-threads",
  storageBucket: "dhakai-threads.appspot.com",
  messagingSenderId: "932531070870",
  appId: "1:932531070870:web:87bae6648e3b7bee909fb7"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' && isSupported().then(yes => yes ? getAnalytics(app) : null);


export { app, firestore, auth, analytics };
