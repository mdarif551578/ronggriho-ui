
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

let app: App;

if (!getApps().length) {
  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // Initialize without explicit credentials, relying on the environment
    app = initializeApp();
  }
} else {
  app = getApps()[0];
}

const firestore = getFirestore(app);

export { firestore };
