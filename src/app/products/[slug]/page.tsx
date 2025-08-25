
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';
import { notFound, useParams } from 'next/navigation';
import ProductPageLoading from './loading';

const toSerializableObject = (productData: any): Product => {
  const data = { ...productData };
  for (const key in data) {
    if (data[key] instanceof (globalThis.Timestamp || Object)) {
      // Convert Timestamp to a serializable format, like an ISO string
      data[key] = (data[key] as any).toDate().toISOString();
    } else if (Array.isArray(data[key])) {
      // Optional: Check for Timestamps within arrays if needed
      data[key] = data[key].map((item: any) => 
        item instanceof (globalThis.Timestamp || Object) ? (item as any).toDate().toISOString() : item
      );
    }
  }
  return data as Product;
};

async function getProduct(slug: string): Promise<Product | null> {
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }
    const doc = querySnapshot.docs[0];
    // The data from the client SDK is already largely serializable, but good practice to ensure.
    const productData = { id: doc.id, ...doc.data() };
    return productData as Product;
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
    if (!product.relatedProductIds || product.relatedProductIds.length === 0) {
        return [];
    }
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, where('__name__', 'in', product.relatedProductIds));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}


export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      
      setLoading(true);
      const fetchedProduct = await getProduct(slug);
      
      if (!fetchedProduct) {
        setProduct(null);
        setLoading(false);
        // This will render the not-found page if used in a server component context,
        // but here we can just show a message or redirect.
        // For static export, notFound() inside useEffect will cause an error.
        // We'll handle it by showing a "not found" state in the UI.
        return;
      }
      
      setProduct(fetchedProduct);
      const fetchedRelatedProducts = await getRelatedProducts(fetchedProduct);
      setRelatedProducts(fetchedRelatedProducts);
      setLoading(false);
    };

    fetchProductData();
  }, [slug]);

  if (loading) {
    return <ProductPageLoading />;
  }

  if (!product) {
    // In a real app, you might render a custom 404 component here
    return <div className="container mx-auto text-center py-20">Product not found.</div>;
  }

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
