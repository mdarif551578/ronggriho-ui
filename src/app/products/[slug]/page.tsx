
import ProductDetailsClient from './product-details-client';
import { clientFirestore } from '@/lib/firebase';
import { collection, getDocs, query, select } from 'firebase/firestore';
import type { Product } from '@/lib/types';

// This function runs only at build time to tell Next.js which pages to generate.
export async function generateStaticParams() {
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, select("slug"));
    const querySnapshot = await getDocs(q);

    const paths = querySnapshot.docs.map(doc => ({
        slug: doc.data().slug,
    }));

    // In case no products are found, return an empty array.
    if (paths.length === 0) {
        return [];
    }

    return paths;
}

// This is the server component wrapper. It renders the client component.
export default function ProductPage() {
  return <ProductDetailsClient />;
}
