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
| `shippingFee`       | `number`    | Shipping fee for the product                                                        | `50`                                                                                           |
| `isFeatured`        | `boolean`   | If shown on homepage                                                                | `true`                                                                                         |
| `isFlashSale`       | `boolean`   | If part of flash sale                                                               | `false`                                                                                        |
| `createdAt`         | `Timestamp` | When the product was added                                                          | `Timestamp(...)`                                                                               |
| `reviews`           | `array`     | A list or reviews that contains individual review object with user and text as key. | `[ { "user":"John", "text":"Fantastic Product" } , { "user":"Macharthy", "text":"Awesome" } ]` |


---

### `orders` Collection
Stores information about customer orders.

| Field              | Type      | Description                                                      | Example                                      |
|--------------------|-----------|------------------------------------------------------------------|----------------------------------------------|
| `uid`              | `string`  | The UID of the user who placed the order.                        | `"a1b2c3d4e5f6g7h8"`                         |
| `items`            | `array`   | An array of ordered item objects.                                | `[{"productId":"prod_xyz","name":"Oversized Tee","quantity":1,"price":999,"image":"url"}]` |
| `total`            | `number`  | The total cost of the order.                                     | `1150.00`                                    |
| `shippingFee`      | `number`    | Shipping fee for the product       | `50`                                                    |
| `status`           | `string`  | The current status of the order.                                 | `"Processing"`                               |
| `statusHistory`    | `array`   | An array of status change objects with timestamps.               | `[{"status":"Pending","timestamp":Timestamp(...)}, {"status":"Processing","timestamp":Timestamp(...)}]` |
| `createdAt`        | `Timestamp`| The server timestamp when the order was placed.                  | `Timestamp(seconds=167..., ...)`             |
| `shippingFullName` | `string`  | The full name for the shipping address.                          | `"Anika Rahman"`                             |
| `shippingAddress`  | `string`  | The street address for shipping.                                 | `"House 12, Road 5, Dhanmondi"`              |
| `shippingCity`     | `string`  | The city for shipping.                                           | `"Dhaka"`                                    |
| `shippingDistrict` | `string`  | The district for shipping.                                       | `"Dhaka"`                                    |
| `shippingPhone`    | `string`  | The contact phone number for the delivery.                       | `"+8801987654321"`                           |
| `paymentMethod`    | `string`  | The payment method used for the order.                           | `"cod"` (Cash on Delivery)                   |
| `paymentStatus`    | `string`  | The status of the payment.                                       | `"pending"`                                  |

    
