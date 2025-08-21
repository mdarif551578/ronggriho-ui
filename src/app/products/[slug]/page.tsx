
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';


// This function tells Next.js which slugs to generate at build time
export async function generateStaticParams() {
  const productsRef = collection(clientFirestore, 'products');
  const q = query(productsRef);
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return [];
  }

  const slugs = querySnapshot.docs.map(doc => ({
    slug: doc.data().slug as string,
  }));
  
  return slugs;
}

const toSerializableObject = (productData: any): Product => {
  const data = { ...productData };
  for (const key in data) {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate().toISOString();
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
    const productData = { id: doc.id, ...doc.data() };
    return toSerializableObject(productData);
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
    if (!product.relatedProductIds || product.relatedProductIds.length === 0) {
        return [];
    }
    const productsRef = collection(clientFirestore, 'products');
    const q = query(productsRef, where('__name__', 'in', product.relatedProductIds));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => toSerializableObject({ id: doc.id, ...doc.data() }));
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Rong Griho`,
    description: product.description,
  };
}


export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
