
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  reviewsInfo: string;
  shippingReturnsInfo: string;
  price: number;
  discountPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  relatedProductIds: string[];
}
