# Rong Griho - Application Blueprint

This document outlines the architecture, features, and technical specifications for the Rong Griho e-commerce platform.

## 1. Core Concept

Rong Griho is a modern e-commerce platform focused on providing a seamless shopping experience for Bangladeshi apparel and accessories. It combines contemporary design with traditional styles, featuring a user-friendly interface and robust functionality for customers.

## 2. Key Features

### Customer-Facing
- **Product Discovery**:
    - Browse all products with filtering (category, size, color, price) and sorting.
    - View products by specific categories.
    - Homepage with featured products, flash deals, and category highlights.
- **Product Details**:
    - View product information, including multiple images, description, pricing, and available sizes/colors.
    - See related products to encourage further browsing.
- **Shopping Cart**:
    - Add/remove items and update quantities.
    - View order summary and subtotal.
- **Checkout**:
    - Secure, multi-step checkout process for authenticated users.
    - Shipping address collection.
    - Multiple payment options: Cash on Delivery, bKash, Nagad.
- **User Account**:
    - Secure login and registration with Firebase Auth.
    - View and manage personal profile information.
    - View order history and track order status.
- **Wishlist**:
    - Save favorite products for later viewing and purchase.
- **Static & Info Pages**:
    - About Us, Contact, FAQ, Privacy Policy, Terms of Service, Return Policy.

## 3. Technical Architecture

- **Framework**: Next.js 14+ with App Router.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
- **UI Components**: ShadCN UI for a consistent and accessible component library.
- **Database**: Google Firestore for storing product, order, and user data. All data access is through the Firebase Client SDK.
- **Authentication**: Firebase Authentication for customer users.
- **State Management**: React Context API for global state (cart, wishlist, auth). Client-side state is managed with React Hooks (`useState`, `useEffect`).
- **AI (Future)**: Genkit for potential generative AI features.

## 4. File Structure Highlights

- `src/app/`: Main application routes (App Router).
- `src/components/`: Reusable React components.
    - `ui/`: ShadCN UI components.
    - `layout/`: Main layout components like Header and Footer.
- `src/hooks/`: Custom React hooks (`useCart`, `useAuth`, `useWishlist`).
- `src/context/`: Global state management using React Context (`CartContext`, `WishlistContext`).
- `src/lib/`: Core logic and utilities.
    - `firebase.ts`: Firebase client-side SDK initialization.
    - `types.ts`: TypeScript type definitions.
- `public/`: Static assets like images and fonts.

## 5. Firestore Data Schema

This section defines the structure for each collection in the Firestore database. The schema uses a simple, flat key-value structure to ensure easy querying and maintainability.

### `users` Collection
Stores information about registered users. The document ID is the same as the Firebase Auth User ID (UID).

| Field         | Type      | Description                                          | Example                             |
|---------------|-----------|------------------------------------------------------|-------------------------------------|
| `uid`         | `string`  | The user's unique ID from Firebase Authentication.   | `"a1b2c3d4e5f6g7h8"`                |
| `displayName` | `string`  | The user's full name.                                | `"John Doe"`                        |
| `email`       | `string`  | The user's email address.                            | `"user@example.com"`                |
| `phone`       | `string`  | The user's phone number.                             | `"+8801234567890"`                  |
| `role`        | `string`  | User role, always `'customer'`.                      | `"customer"`                        |
| `createdAt`   | `Timestamp`| The server timestamp when the user was created.      | `Timestamp(seconds=167..., ...)`    |

---

### `products` Collection
Stores all product information for the e-commerce store.

| Field                 | Type      | Description                                                      | Example                                     |
|-----------------------|-----------|------------------------------------------------------------------|---------------------------------------------|
| `name`                | `string`  | The full name of the product.                                    | `"Elegant Silk Saree"`                      |
| `slug`                | `string`  | A URL-friendly version of the product name.                      | `"elegant-silk-saree"`                      |
| `description`         | `string`  | A short, plain-text summary of the product.                      | `"A beautiful hand-woven silk saree..."`    |
| `longDescription`     | `string`  | A detailed product description, can contain HTML.                | `"<p>More details...</p>"`                   |
| `reviewsInfo`         | `string`  | Information about reviews, can contain HTML.                     | `"<h3>Customer Reviews</h3>..."`            |
| `shippingReturnsInfo` | `string`  | Information about shipping and returns, can contain HTML.        | `"<h3>Shipping Policy</h3>..."`             |
| `price`               | `number`  | The original price of the product.                               | `2500`                                      |
| `discountPrice`       | `number`  | (Optional) The discounted price of the product.                  | `1999`                                      |
| `stock`               | `number`  | The number of items available in stock.                          | `50`                                        |
| `category`            | `string`  | The main category of the product.                                | `"Ethnic Wear"`                             |
| `tags`                | `array`   | An array of strings for filtering and promotion.                 | `["featured", "new-arrival"]`               |
| `images`              | `array`   | An array of string URLs for product images.                      | `["https://.../img1.png"]`                  |
| `sizes`               | `array`   | An array of available sizes.                                     | `["S", "M", "L", "XL"]`                     |
| `colors`              | `array`   | An array of strings defining available colors.                   | `["Red:#FF0000", "Blue:#0000FF"]`            |
| `relatedProductIds`   | `array`   | An array of product document IDs for related items.              | `["prod_abc", "prod_def"]`                  |
| `createdAt`           | `Timestamp`| The server timestamp when the product was added.                 | `Timestamp(seconds=167..., ...)`            |

---

### `orders` Collection
Stores information about customer orders.

| Field              | Type      | Description                                                      | Example                                      |
|--------------------|-----------|------------------------------------------------------------------|----------------------------------------------|
| `userId`           | `string`  | The UID of the user who placed the order.                        | `"a1b2c3d4e5f6g7h8"`                         |
| `items`            | `array`   | An array of strings encoding product ID and quantity.            | `["prod_id1:2", "prod_id2:1"]`               |
| `total`            | `number`  | The total cost of the order.                                     | `5450.50`                                    |
| `status`           | `string`  | The current status of the order.                                 | `"Processing"`                               |
| `createdAt`        | `Timestamp`| The server timestamp when the order was placed.                  | `Timestamp(seconds=167..., ...)`             |
| `shippingFullName` | `string`  | The full name for the shipping address.                          | `"Jane Doe"`                                 |
| `shippingAddress`  | `string`  | The street address for shipping.                                 | `"123 Gulshan Ave, Apt 4B"`                  |
| `shippingCity`     | `string`  | The city for shipping.                                           | `"Dhaka"`                                    |
| `shippingDistrict` | `string`  | The district for shipping.                                       | `"Dhaka"`                                    |
| `shippingPhone`    | `string`  | The contact phone number for the delivery.                       | `"+8801987654321"`                           |
| `paymentMethod`    | `string`  | The payment method used for the order.                           | `"cod"` (Cash on Delivery)                   |
