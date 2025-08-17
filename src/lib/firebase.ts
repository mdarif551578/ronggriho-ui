
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Replace this with your actual Firebase config object
const firebaseConfig = {
  "projectId": "dhakai-threads",
  "appId": "1:932531070870:web:87bae6648e3b7bee909fb7",
  "storageBucket": "dhakai-threads.firebasestorage.app",
  "apiKey": "AIzaSyAYxNV1soev0QJ5m8_gz_qykG5a4qBdrLo",
  "authDomain": "dhakai-threads.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "932531070870"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
