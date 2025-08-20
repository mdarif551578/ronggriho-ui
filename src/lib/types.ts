
export interface Review {
  user: string;
  text: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  stock: number;
  discountPrice?: number | null;
  category: string;
  tags: string[];
  images: string[];
  sizes: string[];
  colors: string[]; // e.g., ["Red:#FF0000", "Blue:#0000FF"]
  relatedProductIds: string[];
  isFeatured: boolean;
  isFlashSale: boolean;
  reviews: Review[];
  createdAt: string; // ISO 8601 date string
}

export interface OrderItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    uid: string; // Firebase Auth UID
    items: OrderItem[]; 
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    paymentStatus: "pending" | "paid";
    shippingFullName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingDistrict: string;
    shippingPhone: string;
    paymentMethod: "cod" | "card" | "bkash";
    createdAt: any; // Firestore Timestamp
}

export interface User {
    id: string; // Document ID, same as Firebase Auth UID
    uid: string;
    displayName: string;
    email: string;
    phone: string;
    role: 'customer';
    createdAt: any; // Firestore Timestamp
}
