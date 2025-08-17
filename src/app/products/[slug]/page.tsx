
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import ProductDetailsClient from './product-details-client';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = await getRelatedProducts(product);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
