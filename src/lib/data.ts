
import 'server-only';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, DocumentData } from 'firebase-admin/firestore';
import type { Product } from './types';

// Initialize Firebase Admin SDK
try {
  if (!getApps().length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    // Fallback for environments where default credentials might be available
    if (!getApps().length) {
        try {
            initializeApp();
        } catch (e) {
            console.error('Fallback Firebase initialization failed:', e);
        }
    }
}


const firestore = getFirestore();

function docDataToProduct(doc: DocumentData): Product {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        longDescription: data.longDescription,
        reviewsInfo: data.reviewsInfo,
        shippingReturnsInfo: data.shippingReturnsInfo,
        price: data.price,
        discountPrice: data.discountPrice,
        category: data.category,
        tags: data.tags || [],
        images: data.images,
        sizes: data.sizes,
        colors: data.colors,
        relatedProductIds: data.relatedProductIds,
    };
}


export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = firestore.collection('products');
    const querySnapshot = await productsCollection.get();
    
    if (querySnapshot.empty) {
      console.log("No products found.");
      return [];
    }
    
    return querySnapshot.docs.map(doc => docDataToProduct(doc));
  } catch (error) {
    console.error("Error getting products: ", error);
    return []; // Return empty array on error
  }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const docRef = firestore.collection('products').doc(id);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docDataToProduct(docSnap);
        }
        return null;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
    }
}


export async function getProductBySlug(slug: string): Promise<Product | undefined> {
   const products = await getProducts();
   return products.find(p => p.slug === slug);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter(p => product.relatedProductIds.includes(p.id) && p.id !== product.id);
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'slug'>>): Promise<void> {
    try {
        const docRef = firestore.collection('products').doc(id);
        await docRef.update(data);
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw new Error("Failed to update product.");
    }
}
