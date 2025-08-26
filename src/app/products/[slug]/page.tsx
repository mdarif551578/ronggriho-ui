
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';
import { useParams } from 'next/navigation';
import ProductPageLoading from './loading';

async function getProduct(slug: string): Promise<Product | null> {
    if (!slug) return null;
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, where('slug', '==', slug), limit(1));
    
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        const productData = { id: doc.id, ...doc.data() };
        return productData as Product;
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return null;
    }
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
    if (!product.relatedProductIds || product.relatedProductIds.length === 0) {
        return [];
    }
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, where('__name__', 'in', product.relatedProductIds));
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
    }
}

// This function tells Next.js which slugs to pre-render at build time for static export.
// It runs ONLY at build time.
export async function generateStaticParams() {
    try {
        const productsRef = collection(clientFirestore, 'products');
        const snapshot = await getDocs(productsRef);
        const slugs = snapshot.docs.map(doc => ({
            slug: doc.data().slug as string,
        }));
        // Filter out any products that might not have a slug
        return slugs.filter(s => s.slug);
    } catch (error) {
        console.error("Error in generateStaticParams, returning empty array:", error);
        // Return an empty array on error to prevent build failure
        return [];
    }
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
      try {
          const fetchedProduct = await getProduct(slug);
          
          if (fetchedProduct) {
              setProduct(fetchedProduct);
              const fetchedRelatedProducts = await getRelatedProducts(fetchedProduct);
              setRelatedProducts(fetchedRelatedProducts);
          } else {
              setProduct(null);
          }
      } catch (error) {
        console.error("Error in fetchProductData:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  if (loading) {
    return <ProductPageLoading />;
  }

  if (!product) {
    return <div className="container mx-auto text-center py-20">Product not found.</div>;
  }

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
