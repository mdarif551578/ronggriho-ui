
import 'server-only';
import type { Product } from './types';

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'ethnic-elegance-kurti',
    name: 'Ethnic Elegance Kurti',
    description: 'A beautifully crafted kurti with traditional motifs, perfect for any festive occasion.',
    price: 1999.99,
    discountPrice: 1599.99,
    category: 'Ethnic Wear',
    tags: ['featured', 'new-arrival'],
    images: ['https://placehold.co/400x500.png', 'https://placehold.co/400x500.png', 'https://placehold.co/400x500.png', 'https://placehold.co/400x500.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Maroon', hex: '#800000' },
      { name: 'Navy', hex: '#000080' },
    ],
    relatedProductIds: ['2', '3', '4'],
  },
  {
    id: '2',
    slug: 'urban-explorer-t-shirt',
    name: 'Urban Explorer T-Shirt',
    description: 'A comfortable and stylish t-shirt for your everyday adventures in the city.',
    price: 799.99,
    category: 'T-Shirts',
    tags: ['best-seller'],
    images: ['https://placehold.co/400x500.png', 'https://placehold.co/400x500.png'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    relatedProductIds: ['1', '5'],
  },
  {
    id: '3',
    slug: 'classic-denim-jeans',
    name: 'Classic Denim Jeans',
    description: 'Timeless denim jeans that are a must-have for every wardrobe.',
    price: 2499.99,
    category: 'Western',
    tags: ['featured'],
    images: ['https://placehold.co/400x500.png'],
    sizes: ['30', '32', '34', '36'],
    colors: [{ name: 'Blue', hex: '#0000FF' }],
    relatedProductIds: ['1', '4'],
  },
  {
    id: '4',
    slug: 'bohemian-printed-scarf',
    name: 'Bohemian Printed Scarf',
    description: 'A vibrant and lightweight scarf to accessorize your outfits.',
    price: 499.99,
    discountPrice: 399.99,
    category: 'Accessories',
    tags: [],
    images: ['https://placehold.co/400x500.png'],
    sizes: ['One Size'],
    colors: [{ name: 'Multicolor', hex: '#FF00FF' }], // Placeholder
    relatedProductIds: ['1', '2'],
  },
   {
    id: '5',
    slug: 'regal-red-saree',
    name: 'Regal Red Saree',
    description: 'A stunning red saree made from pure silk, perfect for weddings and grand celebrations.',
    price: 4999.99,
    category: 'Ethnic Wear',
    tags: ['featured', 'wedding'],
    images: ['https://placehold.co/400x500.png', 'https://placehold.co/400x500.png'],
    sizes: ['One Size'],
    colors: [{ name: 'Red', hex: '#FF0000' }],
    relatedProductIds: ['1', '6', '7'],
  },
  {
    id: '6',
    slug: 'graphic-art-tee',
    name: 'Graphic Art Tee',
    description: 'Express yourself with this unique graphic art t-shirt, a wearable piece of art.',
    price: 899.99,
    discountPrice: 749.99,
    category: 'T-Shirts',
    tags: ['new-arrival'],
    images: ['https://placehold.co/400x500.png'],
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Grey', hex: '#808080' }],
    relatedProductIds: ['2', '5'],
  },
  {
    id: '7',
    slug: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    description: 'A sleek and functional leather crossbody bag for your essentials.',
    price: 1899.99,
    category: 'Accessories',
    tags: ['featured'],
    images: ['https://placehold.co/400x500.png'],
    sizes: ['One Size'],
    colors: [
      { name: 'Brown', hex: '#A52A2A' },
      { name: 'Black', hex: '#000000' }
    ],
    relatedProductIds: ['4', '8'],
  },
  {
    id: '8',
    slug: 'summer-flowy-dress',
    name: 'Summer Flowy Dress',
    description: 'Stay cool and chic in this light and airy summer dress with a floral print.',
    price: 2299.99,
    category: 'Western',
    tags: ['new-arrival'],
    images: ['https://placehold.co/400x500.png'],
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Yellow', hex: '#FFFF00' }],
    relatedProductIds: ['3', '7'],
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  // await delay(500); // Simulate API latency
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // await delay(500); // Simulate API latency
  return mockProducts.find(p => p.slug === slug);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  // await delay(500);
  return mockProducts.filter(p => product.relatedProductIds.includes(p.id) && p.id !== product.id);
}
