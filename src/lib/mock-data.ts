export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  relatedProducts: string[];
}

const products: Product[] = [
  {
    id: '1',
    slug: 'classic-blue-denim-shirt',
    name: 'Classic Blue Denim Shirt',
    description: 'A timeless denim shirt made from 100% premium cotton. Perfect for a casual look, it features a classic collar, button-front closure, and two chest pockets. Versatile and durable for everyday wear.',
    price: 2499.99,
    discountPrice: 1999.99,
    category: 'Western',
    tags: ['shirt', 'denim', 'men', 'featured'],
    images: ['https://placehold.co/800x1000.png', 'https://placehold.co/800x1000.png', 'https://placehold.co/800x1000.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Blue', hex: '#3b82f6' }],
    relatedProducts: ['3', '4'],
  },
  {
    id: '2',
    slug: 'handwoven-jamdani-saree',
    name: 'Handwoven Jamdani Saree',
    description: 'Experience elegance with this exquisite handwoven Jamdani saree. Crafted by skilled artisans in Bangladesh, this saree features intricate floral motifs on a lightweight, airy fabric. A true piece of heritage.',
    price: 7999.99,
    category: 'Ethnic Wear',
    tags: ['saree', 'ethnic', 'women', 'featured', 'handwoven'],
    images: ['https://placehold.co/800x1000.png', 'https://placehold.co/800x1000.png', 'https://placehold.co/800x1000.png'],
    sizes: ['One Size'],
    colors: [{ name: 'Cream', hex: '#f5f5dc' }, { name: 'Red', hex: '#dc2626' }],
    relatedProducts: ['5', '6'],
  },
  {
    id: '3',
    slug: 'urban-graphic-tee',
    name: 'Urban Graphic Tee',
    description: 'Make a statement with this soft cotton graphic t-shirt. Featuring a bold, modern design inspired by city life, this tee offers both comfort and style. Ideal for pairing with jeans or shorts.',
    price: 999.99,
    category: 'T-Shirts',
    tags: ['t-shirt', 'men', 'women'],
    images: ['https://placehold.co/800x1000.png', 'https://placehold.co/800x1000.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#ffffff' }],
    relatedProducts: ['1', '4'],
  },
  {
    id: '4',
    slug: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    description: 'A chic and practical accessory, this crossbody bag is crafted from high-quality faux leather. It features multiple compartments to keep your essentials organized and an adjustable strap for comfort.',
    price: 3299.99,
    discountPrice: 2799.99,
    category: 'Accessories',
    tags: ['bag', 'accessories', 'women'],
    images: ['https://placehold.co/800x1000.png'],
    sizes: ['One Size'],
    colors: [{ name: 'Tan', hex: '#d2b48c' }],
    relatedProducts: ['2', '5'],
  },
  {
    id: '5',
    slug: 'embroidered-salwar-kameez',
    name: 'Embroidered Salwar Kameez',
    description: 'This elegant salwar kameez set is perfect for festive occasions. It showcases delicate embroidery on the neckline and sleeves, paired with a matching dupatta for a complete, graceful look.',
    price: 4599.99,
    category: 'Ethnic Wear',
    tags: ['salwar-kameez', 'ethnic', 'women', 'featured'],
    images: ['https://placehold.co/800x1000.png'],
    sizes: ['M', 'L', 'XL'],
    colors: [{ name: 'Teal', hex: '#008080' }],
    relatedProducts: ['2', '6'],
  },
  {
    id: '6',
    slug: 'silver-jhumka-earrings',
    name: 'Silver Jhumka Earrings',
    description: 'Complete your ethnic ensemble with these stunning silver-plated jhumka earrings. They feature intricate detailing and a classic design that adds a touch of traditional charm to any outfit.',
    price: 1299.99,
    category: 'Accessories',
    tags: ['earrings', 'jewelry', 'women', 'ethnic'],
    images: ['https://placehold.co/800x1000.png'],
    sizes: ['One Size'],
    colors: [{ name: 'Silver', hex: '#c0c0c0' }],
    relatedProducts: ['2', '5'],
  },
  {
    id: '7',
    slug: 'mens-slim-fit-chinos',
    name: 'Men\'s Slim-Fit Chinos',
    description: 'Versatile and stylish, these slim-fit chinos are a wardrobe staple. Made from a comfortable stretch-cotton blend, they can be dressed up or down for any occasion. Available in multiple classic colors.',
    price: 2199.99,
    category: 'Western',
    tags: ['pants', 'chinos', 'men', 'featured'],
    images: ['https://placehold.co/800x1000.png'],
    sizes: ['30', '32', '34', '36'],
    colors: [{ name: 'Khaki', hex: '#f0e68c' }, { name: 'Navy', hex: '#000080' }],
    relatedProducts: ['1', '3'],
  },
  {
    id: '8',
    slug: 'floral-print-midi-dress',
    name: 'Floral Print Midi Dress',
    description: 'A beautiful midi dress with a vibrant floral print, perfect for spring and summer. It features a flattering V-neck, cinched waist, and a flowy skirt that moves gracefully with you.',
    price: 3499.99,
    discountPrice: 2999.99,
    category: 'Western',
    tags: ['dress', 'women', 'floral'],
    images: ['https://placehold.co/800x1000.png'],
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Pink', hex: '#ffc0cb' }],
    relatedProducts: ['2', '4'],
  },
];

export function getProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products.filter(p => product.relatedProducts.includes(p.id));
}
