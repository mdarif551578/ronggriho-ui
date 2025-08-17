
import 'server-only';
import type { Product } from './types';

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'ethnic-elegance-kurti',
    name: 'Ethnic Elegance Kurti',
    description: 'A beautifully crafted kurti with traditional motifs, perfect for any festive occasion.',
    longDescription: `
      <p>Embrace timeless elegance with our Ethnic Elegance Kurti. This piece is a celebration of traditional craftsmanship, featuring intricate motifs inspired by Bangladeshi heritage. Made from premium, breathable cotton, it ensures comfort throughout the day while making a sophisticated style statement.</p>
      <div class="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 class="font-semibold text-foreground mb-2">Product Details</h4>
          <ul class="list-disc list-inside space-y-1">
            <li>Material: 100% Premium Cotton</li>
            <li>Fit: Regular</li>
            <li>Neck: Mandarin Collar</li>
            <li>Sleeves: Three-Quarter Sleeves</li>
            <li>Embroidery: Fine thread work on neckline and cuffs</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-foreground mb-2">Care Instructions</h4>
          <ul class="list-disc list-inside space-y-1">
            <li>Machine wash cold, inside-out, gentle cycle with mild detergent</li>
            <li>Tumble dry low, or hang-dry in shade for the longest life</li>
            <li>Do not bleach</li>
            <li>Cool iron inside-out if necessary. Do not iron on decoration.</li>
          </ul>
        </div>
      </div>
    `,
    reviewsInfo: `
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">Customer Reviews (3)</h3>
          <div class="space-y-4">
            <div class="border-b pb-4">
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                <p class="ml-auto text-sm text-muted-foreground">October 26, 2023</p>
              </div>
              <p class="font-semibold">Sadia Rahman</p>
              <p class="text-muted-foreground text-sm mt-1">Absolutely love this kurti! The fabric is so soft and the fit is perfect. Received so many compliments.</p>
            </div>
            <div class="border-b pb-4">
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                <p class="ml-auto text-sm text-muted-foreground">October 20, 2023</p>
              </div>
              <p class="font-semibold">Farah Islam</p>
              <p class="text-muted-foreground text-sm mt-1">Good quality for the price. The color is slightly different from the picture but still beautiful.</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Write a Review</h3>
          <p class="text-muted-foreground">Share your thoughts with other customers.</p>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 w-full">Write a Review</button>
        </div>
      </div>
    `,
    shippingReturnsInfo: `
      <h4 class="font-semibold text-foreground">Standard Shipping</h4>
      <p>We offer standard shipping across Bangladesh. Delivery times are as follows:</p>
      <ul class="list-disc list-inside">
        <li><strong>Inside Dhaka:</strong> 2-3 business days</li>
        <li><strong>Outside Dhaka:</strong> 3-5 business days</li>
      </ul>
      <p>Shipping costs will be calculated at checkout. You can track your order status from your <a href="/account/orders" class="text-primary underline">account page</a>.</p>
      <h4 class="font-semibold text-foreground mt-6">Returns Policy</h4>
      <p>We have a 7-day return policy for items that are unused, in their original condition, and with all original tags attached. To initiate a return, please visit our <a href="/returns" class="text-primary underline">Return Policy</a> page for detailed instructions or contact our customer support.</p>
    `,
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
    longDescription: '<p>A comfortable and stylish t-shirt for your everyday adventures in the city. Made from 100% cotton for maximum comfort.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>Timeless denim jeans that are a must-have for every wardrobe. Durable, stylish, and versatile.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>A vibrant and lightweight scarf to accessorize your outfits. Adds a pop of color to any look.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>A stunning red saree made from pure silk, perfect for weddings and grand celebrations. Includes matching blouse piece.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>Express yourself with this unique graphic art t-shirt, a wearable piece of art. High-quality print on soft cotton.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>A sleek and functional leather crossbody bag for your essentials. Made from genuine leather with multiple compartments.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
    longDescription: '<p>Stay cool and chic in this light and airy summer dress with a floral print. Perfect for warm weather.</p>',
    reviewsInfo: '<p>No reviews yet. Be the first to review this product!</p>',
    shippingReturnsInfo: '<p>Standard shipping and returns policy applies. Check our policies page for more details.</p>',
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
