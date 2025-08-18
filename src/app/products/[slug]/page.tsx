
'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';
import ProductPageLoading from './loading';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const productsRef = collection(clientFirestore, 'products');
        const q = query(productsRef, where('slug', '==', params.slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          notFound();
          return;
        }

        const productDoc = querySnapshot.docs[0];
        const productData = { id: productDoc.id, ...productDoc.data() } as Product;
        setProduct(productData);

        if (productData.relatedProductIds && productData.relatedProductIds.length > 0) {
          const relatedProductsQuery = query(productsRef, where('__name__', 'in', productData.relatedProductIds));
          const relatedSnapshot = await getDocs(relatedProductsQuery);
          const fetchedRelated = relatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
          setRelatedProducts(fetchedRelated);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.slug]);

  if (loading) {
    return <ProductPageLoading />;
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
