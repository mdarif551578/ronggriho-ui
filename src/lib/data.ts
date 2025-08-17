
import 'server-only';
import { Product } from './types';
import { app } from './firebase';
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

const db = getFirestore(app);

// In a real app, you would implement caching for these requests.
async function fetchProductsFromFirestore(): Promise<Product[]> {
    const productsCol = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return productsList;
}

async function fetchProductFromFirestore(slug: string): Promise<Product | undefined> {
    const q = query(collection(db, "products"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return undefined;
    }
    const productDoc = querySnapshot.docs[0];
    return { id: productDoc.id, ...productDoc.data() } as Product;
}


// Simulate network delay - This can be removed if you don't need to simulate latency
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  // Now fetches from Firestore
  const products = await fetchProductsFromFirestore();
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await fetchProductFromFirestore(slug);
  return product;
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
    if (!product.relatedProductIds || product.relatedProductIds.length === 0) {
        return [];
    }
  const allProducts = await fetchProductsFromFirestore();
  // Firestore doesn't have a direct `IN` query that's easy to use with slugs/ids without fetching all,
  // so we filter locally for simplicity. For large catalogs, this should be optimized.
  return allProducts.filter(p => product.relatedProductIds.includes(p.id) && p.id !== product.id);
}
