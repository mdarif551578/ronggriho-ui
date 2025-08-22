
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
      // Convert Timestamp to a serializable format, like an ISO string
      data[key] = data[key].toDate().toISOString();
    } else if (Array.isArray(data[key])) {
      // Optional: Check for Timestamps within arrays if needed, though not required by current schema
      data[key] = data[key].map((item: any) => 
        item instanceof Timestamp ? item.toDate().toISOString() : item
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
    const productData = toSerializableObject({ id: doc.id, ...doc.data() });
    return productData;
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

  const title = `${product.name} | Rong Griho`;
  const description = product.description;
  const imageUrl = product.images?.[0] || 'https://rong-griho.vercel.app/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
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
