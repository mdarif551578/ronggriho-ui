# Rong Griho - Application Blueprint

This document outlines the architecture, features, and technical specifications for the Rong Griho e-commerce platform.

## 1. Core Concept

Rong Griho is a modern e-commerce platform focused on providing a seamless shopping experience for Bangladeshi Fashion and Clothing apparel and accessories. It combines contemporary design with Modern styles or Clothing with Premium Fashion Choices, featuring a user-friendly interface and robust functionality for customers.

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
## 2. Technical Architecture

- **Framework**: Next.js 14+ with App Router.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
- **UI Components**: ShadCN UI for a consistent and accessible component library.
- **Database**: Google Firestore for storing product, order, and user data. All data access is through the Firebase Client SDK.
- **Authentication**: Firebase Authentication for both customer and admin users.
- **State Management**: React Context API for global state (cart, wishlist, auth). Client-side state is managed with React Hooks (`useState`, `useEffect`).
- **AI (Future)**: Genkit for potential generative AI features.

## 3. File Structure Highlights

- `src/app/`: Main application routes (App Router).
    - `(main)`: Group for customer-facing routes.
    - `admin`: Routes for the admin panel.
- `src/components/`: Reusable React components.
    - `ui/`: ShadCN UI components.
    - `layout/`: Main layout components like Header and Footer.
    - `admin/`: Components specific to the admin panel.
- `src/hooks/`: Custom React hooks (`useCart`, `useAuth`, `useWishlist`).
- `src/context/`: Global state management using React Context (`CartContext`, `WishlistContext`).
- `src/lib/`: Core logic and utilities.
    - `firebase.ts`: Firebase client-side SDK initialization.
    - `types.ts`: TypeScript type definitions.
- `public/`: Static assets like images and fonts.

## 4. Firestore Data Schema
## `users` Collection

|Field|Type|Description|Example|
|---|---|---|---|
|`displayName`|`string`|Full name of the user|`"John Doe"`|
|`email`|`string`|Email address|`"user@example.com"`|
|`phone`|`string`|Phone number|`"+8801234567890"`|
|`role`|`string`|`'customer'` or `'admin'`|`"customer"`|
|`createdAt`|`Timestamp`|When the user was created|`Timestamp(...)`|

---

## `products` Collection

| Field               | Type        | Description                                                                         | Example                                                                                        |
| ------------------- | ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `name`              | `string`    | Product name                                                                        | `"Classic Cotton T-Shirt"`                                                                     |
| `slug`              | `string`    | URL-friendly name                                                                   | `"classic-cotton-tshirt"`                                                                      |
| `description`       | `string`    | Short summary                                                                       | `"Soft and breathable cotton t-shirt"`                                                         |
| `longDescription`   | `string`    | Detailed description (HTML allowed)                                                 | `"<p>Crafted from 100% cotton...</p>"`                                                         |
| `price`             | `number`    | Original price                                                                      | `24.99`                                                                                        |
| `discountPrice`     | `number`    | Discounted price (optional)                                                         | `19.99`                                                                                        |
| `stock`             | `number`    | Available quantity                                                                  | `150`                                                                                          |
| `category`          | `string`    | Product category                                                                    | `"Men > T-Shirts"`                                                                             |
| `tags`              | `array`     | Tags for filtering                                                                  | `["casual", "summer"]`                                                                         |
| `images`            | `array`     | Product image URLs                                                                  | `["https://.../img1.png"]`                                                                     |
| `sizes`             | `array`     | Available sizes                                                                     | `["S", "M", "L", "XL"]`                                                                        |
| `colors`            | `array`     | Available colors                                                                    | `["Black:#000000", "Gray:#808080"]`                                                            |
| `relatedProductIds` | `array`     | Related product IDs                                                                 | `["prod_123", "prod_456"]`                                                                     |
| `isFeatured`        | `boolean`   | If shown on homepage                                                                | `true`                                                                                         |
| `isFlashSale`       | `boolean`   | If part of flash sale                                                               | `false`                                                                                        |
| `createdAt`         | `Timestamp` | When the product was added                                                          | `Timestamp(...)`                                                                               |
| `reviews`           | `array`     | A list or reviews that contains individual review object with user and text as key. | `[ { "user":"John", "text":"Fantastic Product" } , { "user":"Macharthy", "text":"Awesome" } ]` |

---

## `orders` Collection

|Field|Type|Description|Example|
|---|---|---|---|
|`uid`|`string`|User ID (from `users`)|`"user_doc_id"`|
|`items`|`array`|Array of product objects with qty|`[{"productId":"prod_123","quantity":2,"price":19.99}]`|
|`total`|`number`|Total order amount|`49.98`|
|`status`|`string`|`"Pending"|"Processing"|
|`shippingFullName`|`string`|Recipient name|`"Jane Doe"`|
|`shippingAddress`|`string`|Street address|`"123 Gulshan Ave, Apt 4B"`|
|`shippingCity`|`string`|City|`"Dhaka"`|
|`shippingDistrict`|`string`|District|`"Dhaka"`|
|`shippingPhone`|`string`|Contact number|`"+8801987654321"`|
|`paymentMethod`|`string`|`"cod"`, `"card"`, `"bkash"`|`"cod"`|
|`paymentStatus`|`string`|`"pending"|"paid"|
|`createdAt`|`Timestamp`|When the order was placed|`Timestamp(...)`|