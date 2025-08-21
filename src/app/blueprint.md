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
## 2. Technical Architecture

- **Framework**: Next.js 14+ with App Router (Static Export).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
- **UI Components**: ShadCN UI for a consistent and accessible component library.
- **Database**: Google Firestore for storing product, order, and user data (accessed via Client SDK).
- **Authentication**: Firebase Authentication for both customer and admin users.
- **State Management**: React Context API for global state (cart, wishlist, auth).

## 3. File Structure Highlights

- `src/app/`: Main application routes (App Router).
- `src/components/`: Reusable React components.
- `src/hooks/`: Custom React hooks (`useCart`, `useAuth`, `useWishlist`).
- `src/context/`: Global state management using React Context.
- `src/lib/`: Core logic, types, and Firebase configuration.
- `public/`: Static assets.

## 4. Firestore Data Schema
## `users` Collection

|Field|Type|Description|Example|
|---|---|---|---|
|`displayName`|`string`|Full name of the user|`"Zayan Chowdhury"`|
|`email`|`string`|Email address|`"user@example.com"`|
|`phone`|`string`|Phone number|`"+8801234567890"`|
|`role`|`string`|`'customer'` or `'admin'`|`"customer"`|
|`createdAt`|`Timestamp`|When the user was created|`Timestamp(...)`|

---

## `products` Collection

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

## `orders` Collection

|Field|Type|Description|Example|
|---|---|---|---|
|`uid`|`string`|User ID (from `users`)|`"user_doc_id"`|
|`items`|`array`|Array of ordered item objects.|`[{"productId":"prod_xyz","name":"Oversized Tee","quantity":1,"price":999,"image":"url"}]`|
|`total`|`number`|Total order amount|`1150.00`|
|`status`|`string`|`"Pending"`, `"Processing"`, etc.|`"Processing"`|
|`shippingFullName`|`string`|Recipient name|`"Anika Rahman"`|
|`shippingAddress`|`string`|Street address|`"House 12, Road 5, Dhanmondi"`|
|`shippingCity`|`string`|City|`"Dhaka"`|
|`shippingDistrict`|`string`|District|`"Dhaka"`|
|`shippingPhone`|`string`|Contact number|`"+8801987654321"`|
|`paymentMethod`|`string`|`"cod"`, `"card"`, `"bkash"`|`"cod"`|
|`paymentStatus`|`string`|`"pending"` or `"paid"`|`"pending"`|
|`createdAt`|`Timestamp`|When the order was placed|`Timestamp(...)`|
