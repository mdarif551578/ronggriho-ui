
// This file is no longer used for server-side data fetching with the Admin SDK.
// All data operations now use the client-side SDK in their respective components.
// This file is kept to avoid breaking imports in components that will be updated,
// but its functions are effectively deprecated.

import type { Product } from './types';

// The following functions are deprecated and will not work as expected.
// They are kept temporarily to prevent breaking builds during refactoring.

export async function getProducts(): Promise<Product[]> {
  console.warn("DEPRECATED: getProducts should not be called from data.ts anymore.");
  return []; 
}

export async function getProductById(id: string): Promise<Product | null> {
    console.warn("DEPRECATED: getProductById should not be called from data.ts anymore.");
    return null;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
   console.warn("DEPRECATED: getProductBySlug should not be called from data.ts anymore.");
   return undefined;
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  console.warn("DEPRECATED: getRelatedProducts should not be called from data.ts anymore.");
  return [];
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'slug'>>): Promise<void> {
    console.warn("DEPRECATED: updateProduct should not be called from data.ts anymore.");
}
