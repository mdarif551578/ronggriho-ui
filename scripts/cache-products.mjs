// This script fetches all products from Firestore and caches them in a local JSON file.
// It's intended to be run at build time (e.g., in a 'postinstall' script) to avoid
// needing a live database connection during the Next.js build process itself.

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs/promises';
import path from 'path';

const productsCachePath = path.join(process.cwd(), '.products.json');

async function cacheProducts() {
  console.log('Initializing Firebase Admin SDK...');
  try {
    // Initialize the Admin SDK without a service account file.
    // In a secure environment (like Google Cloud or Firebase Hosting),
    // the SDK automatically uses the service account associated with the runtime.
    if (!getApps().length) {
      initializeApp();
    }
  } catch (error) {
    console.error(
      "Error initializing Firebase Admin SDK. This can happen if the environment isn't configured with service account credentials.",
      error
    );
    // Exit gracefully if we can't initialize, to avoid breaking the build.
    process.exit(0);
  }

  console.log('Firebase Admin SDK initialized. Fetching products...');

  try {
    const db = getFirestore();
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      console.log('No products found in Firestore. Caching an empty array.');
      await fs.writeFile(productsCachePath, JSON.stringify([]), 'utf-8');
      return;
    }

    const products = snapshot.docs.map((doc) => {
      const data = doc.data();
      // Ensure Timestamps are converted to a serializable format if they exist
      const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString() : new Date().toISOString();
      return {
        id: doc.id,
        ...data,
        createdAt,
      };
    });

    console.log(`Fetched ${products.length} products. Caching to ${productsCachePath}...`);
    await fs.writeFile(productsCachePath, JSON.stringify(products, null, 2), 'utf-8');
    console.log('Products cached successfully.');
  } catch (error) {
    console.error('Error fetching or caching products:', error);
    // Create an empty file to prevent the build from breaking
    await fs.writeFile(productsCachePath, JSON.stringify([]), 'utf-8');
    console.log('Created an empty .products.json to allow the build to continue.');
  }
}

cacheProducts();
