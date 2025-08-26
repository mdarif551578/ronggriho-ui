
import { collection, getDocs, query } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';

// This function is required for static exports.
// It runs only at build time to tell Next.js what pages to generate.
export async function generateStaticParams() {
  const productsRef = collection(clientFirestore, 'products');
  const q = query(productsRef);
  const querySnapshot = await getDocs(q);
  
  const products = querySnapshot.docs.map(doc => doc.data() as Product);

  // Return an array of objects, where each object has a `slug` property.
  return products.map(product => ({
    slug: product.slug,
  }));
}

// This is a server component that renders the client component.
export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  // We pass the slug to the client component, which will handle all data fetching.
  return <ProductDetailsClient slug={params.slug} />;
}
