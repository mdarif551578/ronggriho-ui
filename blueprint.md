# Rong Griho - Application Blueprint

This document outlines the architecture, features, and technical specifications for the Rong Griho e-commerce platform.

## 1. Core Concept

Rong Griho is a modern fashion platform curated for the young, urban Bangladeshi. It bridges the gap between global trends and local identity, offering a unique blend of "Urban Desi" and "Global Threads" styles. The focus is on contemporary apparel and accessories that resonate with a digitally-native generation.

## 2. Key Features

### Customer-Facing
- **Product Discovery**:
    - Browse products with modern filtering (category, size, color, price) and sorting.
    - View products by curated categories like "Urban Desi" and "Global Threads".
    - Homepage with featured looks, new arrivals, and trending styles.
- **Product Details**:
    - View product information, including multiple images, description, pricing, and available sizes/colors.
    - See "Complete the Look" suggestions for related items.
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

- **Framework**: Next.js 14+ with App Router (Static Export).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
- **UI Components**: ShadCN UI for a consistent and accessible component library.
- **Database**: Google Firestore for storing product, order, and user data (accessed via Client SDK).
- **Authentication**: Firebase Authentication for customer users.
- **State Management**: React Context API for global state (cart, wishlist, auth).

## 4. File Structure Highlights

- `src/app/`: Main application routes (App Router).
- `src/components/`: Reusable React components.
- `src/hooks/`: Custom React hooks (`useCart`, `useAuth`, `useWishlist`).
- `src/context/`: Global state management using React Context.
- `src/lib/`: Core logic, types, and Firebase configuration.
- `public/`: Static assets.

## 5. Firestore Data Schema

### `users` Collection
Stores information about registered users. The document ID is the same as the Firebase Auth User ID (UID).

| Field         | Type      | Description                                          | Example                             |
|---------------|-----------|------------------------------------------------------|-------------------------------------|
| `uid`         | `string`  | The user's unique ID from Firebase Authentication.   | `"a1b2c3d4e5f6g7h8"`                |
| `displayName` | `string`  | The user's full name.                                | `"Zayan Chowdhury"`                 |
| `email`       | `string`  | The user's email address.                            | `"user@example.com"`                |
| `phone`       | `string`  | The user's phone number.                             | `"+8801234567890"`                  |
| `role`        | `string`  | User role, always `'customer'`.                      | `"customer"`                        |
| `createdAt`   | `Timestamp`| The server timestamp when the user was created.      | `Timestamp(seconds=167..., ...)`    |

---

### `products` Collection
Stores all product information for the store.

| Field                 | Type      | Description                                                      | Example                                     |
|-----------------------|-----------|------------------------------------------------------------------|---------------------------------------------|
| `name`                | `string`  | The full name of the product.                                    | `"Oversized Graphic Tee"`                   |
| `slug`                | `string`  | A URL-friendly version of the product name.                      | `"oversized-graphic-tee"`                   |
| `description`         | `string`  | A short, plain-text summary of the product.                      | `"A comfortable oversized tee with a retro print."` |
| `longDescription`     | `string`  | A detailed product description, can contain HTML.                | `"<p>More details about the fabric...</p>"`|
| `reviews`             | `array`   | An array of review objects.                                      | `[{"user": "Anika", "text": "Love the fit!"}]` |
| `price`               | `number`  | The original price of the product.                               | `1200`                                      |
| `discountPrice`       | `number`  | (Optional) The discounted price of the product.                  | `999`                                       |
| `stock`               | `number`  | The number of items available in stock.                          | `100`                                       |
| `category`            | `string`  | The main category of the product.                                | `"Urban Desi"`                              |
| `tags`                | `array`   | An array of strings for filtering.                               | `["streetwear", "new-arrival"]`             |
| `images`              | `array`   | An array of string URLs for product images.                      | `["https://.../img1.png"]`                  |
| `sizes`               | `array`   | An array of available sizes.                                     | `["S", "M", "L", "XL"]`                     |
| `colors`              | `array`   | An array of strings defining available colors.                   | `["Black:#000000", "White:#FFFFFF"]`         |
| `relatedProductIds`   | `array`   | An array of product document IDs for related items.              | `["prod_abc", "prod_def"]`                  |
| `isFeatured`          | `boolean` | If `true`, product appears in the featured section.              | `true`                                      |
| `isFlashSale`         | `boolean` | If `true`, product appears in the flash deals section.           | `false`                                     |
| `createdAt`           | `Timestamp`| The server timestamp when the product was added.                 | `Timestamp(seconds=167..., ...)`            |


---

### `orders` Collection
Stores information about customer orders.

| Field              | Type      | Description                                                      | Example                                      |
|--------------------|-----------|------------------------------------------------------------------|----------------------------------------------|
| `uid`              | `string`  | The UID of the user who placed the order.                        | `"a1b2c3d4e5f6g7h8"`                         |
| `items`            | `array`   | An array of ordered item objects.                                | `[{"productId":"prod_xyz","name":"Oversized Tee","quantity":1,"price":999,"image":"url"}]` |
| `total`            | `number`  | The total cost of the order.                                     | `1150.00`                                    |
| `status`           | `string`  | The current status of the order.                                 | `"Processing"`                               |
| `createdAt`        | `Timestamp`| The server timestamp when the order was placed.                  | `Timestamp(seconds=167..., ...)`             |
| `shippingFullName` | `string`  | The full name for the shipping address.                          | `"Anika Rahman"`                             |
| `shippingAddress`  | `string`  | The street address for shipping.                                 | `"House 12, Road 5, Dhanmondi"`              |
| `shippingCity`     | `string`  | The city for shipping.                                           | `"Dhaka"`                                    |
| `shippingDistrict` | `string`  | The district for shipping.                                       | `"Dhaka"`                                    |
| `shippingPhone`    | `string`  | The contact phone number for the delivery.                       | `"+8801987654321"`                           |
| `paymentMethod`    | `string`  | The payment method used for the order.                           | `"cod"` (Cash on Delivery)                   |
| `paymentStatus`    | `string`  | The status of the payment.                                       | `"pending"`                                  |
