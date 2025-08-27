
import { collection, getDocs, query } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';
import type { Metadata } from 'next';

// This function is required for static exports.
// It runs only at build time to tell Next.js what pages to generate.
export async function generateStaticParams() {
  try {
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef);
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.warn("No products found in Firestore for generateStaticParams. Check your collection.");
      return [];
    }
    
    const products = querySnapshot.docs.map(doc => doc.data() as Product);

    // Return an array of objects, where each object has a `slug` property.
    return products.map(product => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs for generateStaticParams:", error);
    // Return an empty array to prevent the build from crashing.
    // This means pages won't be pre-generated if Firestore is unreachable.
    return [];
  }
}

// This is a server component that renders the client component.
export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  // We pass the slug to the client component, which will handle all data fetching.
  return <ProductDetailsClient slug={params.slug} />;
}

export const dynamicParams = true; // Allow new slugs not generated at build time
