
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

        // Firestore Timestamps are not serializable, so convert them to strings
        const toSerializableObject = (obj: any): any => {
          for (const key in obj) {
            if (obj[key] instanceof Object && 'seconds' in obj[key] && 'nanoseconds' in obj[key]) {
              obj[key] = new Date(obj[key].seconds * 1000).toISOString();
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              toSerializableObject(obj[key]);
            }
          }
          return obj;
        };

        return toSerializableObject(productData) as Product;
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
