
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { clientFirestore } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import ProductDetailsClient from './product-details-client';
import type { Metadata, ResolvingMetadata } from 'next'

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
    const q = query(productsRef, where('__name__', 'in', product.relatedProductIds.slice(0, 10)));
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
    }
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.name,
    description: product.description,
     alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1000,
          alt: product.name,
        },
        ...previousImages,
      ],
    },
     twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  }
}


export default async function ProductDetailsPage({ params }: Props) {
  const slug = params.slug as string;
  const product = await getProduct(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <ProductDetailsClient product={product} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <div className="mt-6 text-muted-foreground prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
            </TabsContent>
            <TabsContent value="reviews">
              <div className="mt-6">
                  {(product.reviews && product.reviews.length > 0) ? (
                      <div className="space-y-6">
                          {product.reviews.map((review, index) => (
                              <div key={index} className="border-b pb-4">
                                <div className="flex items-center mb-2">
                                  <p className="ml-4 font-semibold">{review.user}</p>
                                </div>
                                <p className="text-muted-foreground">{review.text}</p>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-muted-foreground text-center py-8">No reviews yet for this product.</p>
                  )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center font-headline mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
