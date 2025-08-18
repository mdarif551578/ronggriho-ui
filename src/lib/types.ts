
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  reviewsInfo: string;
  shippingReturnsInfo: string;
  price: number;
  stock: number;
  discountPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  sizes: string[];
  colors: string[]; // e.g., ["Red:#FF0000", "Blue:#0000FF"]
  relatedProductIds: string[];
  createdAt: any; // Firestore Timestamp
}

export interface Order {
    id: string;
    userId: string;
    items: string[]; // e.g., ["productId:quantity"]
    total: number;
    status: string; // The latest status
    createdAt: any; // Firestore Timestamp
    shippingFullName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingDistrict: string;
    shippingPhone: string;
    paymentMethod: string;
}

export interface User {
    id: string; // Document ID, same as Firebase Auth UID
    uid: string;
    displayName: string;
    email: string;
    phone: string;
    role?: 'customer' | 'admin';
    createdAt: any; // Firestore Timestamp
}
