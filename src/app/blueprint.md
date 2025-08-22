# Rong Griho - Application Blueprint

This document outlines the architecture, features, and technical specifications for the **Rong Griho** e-commerce platform.

---

## 1. Core Concept

Rong Griho is a modern fashion platform designed for the young, urban Bangladeshi audience. It blends **global fashion trends** with **local identity**, offering a unique mix of _Urban Desi_ and _Global Threads_. The focus is on **contemporary apparel and accessories** that resonate with a digitally-native generation.

---

## 2. Key Features

### Customer-Facing

- **Product Discovery**
    
    - Browse products with filtering (category, size, color, price) and sorting.
        
    - Explore curated categories like _Urban Desi_ and _Global Threads_.
        
    - Homepage highlights: featured items, new arrivals, trending looks.
        
- **Product Details**
    
    - View product descriptions, multiple images, available sizes, and colors.
        
    - See "Complete the Look" suggestions for related products.
        
- **Shopping Cart**
    
    - Add/remove items, update quantities.
        
    - View order summary and subtotal.
        
- **Checkout**
    
    - Secure, multi-step checkout for authenticated users.
        
    - Collect shipping details.
        
    - Support for multiple payment methods: **Cash on Delivery, bKash, Nagad, Card**.
        
- **User Account**
    
    - Authentication with Firebase Auth.
        
    - Manage profile details.
        
    - View order history and track order status.
        
- **Wishlist**
    
    - Save favorite products for later.
        
- **Static Pages**
    
    - About Us, Contact, FAQ, Privacy Policy, Terms of Service, Return Policy.
        

---

## 3. Technical Architecture

- **Framework**: Next.js 14+ (App Router, Static Export).
    
- **Language**: TypeScript.
    
- **Styling**: Tailwind CSS + `tailwindcss-animate`.
    
- **UI Components**: ShadCN UI.
    
- **Database**: Google Firestore (products, users, orders).
    
- **Authentication**: Firebase Authentication.
    
- **State Management**: React Context API (cart, wishlist, auth).

---

## 4. Firestore Data Schema

### `users` Collection

Stores registered users. Document ID = Firebase Auth UID.

|Field|Type|Description|Example|
|---|---|---|---|
|`uid`|`string`|Firebase Authentication UID|`"a1b2c3d4e5f6"`|
|`displayName`|`string`|Full name of the user|`"Zayan Chowdhury"`|
|`email`|`string`|User email|`"user@example.com"`|
|`phone`|`string`|User phone number|`"+8801234567890"`|
|`role`|`string`|`'customer'` or `'admin'`|`"customer"`|
|`createdAt`|`Timestamp`|When the user was created|`Timestamp(...)`|

---

### `products` Collection

Stores all products available in the store.

|Field|Type|Description|Example|
|---|---|---|---|
|`name`|`string`|Product name|`"Classic Cotton T-Shirt"`|
|`slug`|`string`|URL-friendly identifier|`"classic-cotton-tshirt"`|
|`description`|`string`|Short summary|`"Soft and breathable cotton t-shirt"`|
|`longDescription`|`string`|Detailed description (HTML supported)|`"<p>Crafted from 100% cotton...</p>"`|
|`price`|`number`|Original price|`24.99`|
|`discountPrice`|`number`|Discounted price (optional)|`19.99`|
|`stock`|`number`|Inventory count|`150`|
|`category`|`string`|Product category|`"Men > T-Shirts"`|
|`tags`|`array`|Keywords for filtering|`["casual", "summer"]`|
|`images`|`array`|Product image URLs|`["https://.../img1.png"]`|
|`sizes`|`array`|Available sizes|`["S", "M", "L", "XL"]`|
|`colors`|`array`|Available colors with hex codes|`["Black:#000000", "Gray:#808080"]`|
|`relatedProductIds`|`array`|Related product IDs|`["prod_123", "prod_456"]`|
|`shippingFee`|`number`|Shipping fee for this product|`50`|
|`isFeatured`|`boolean`|Whether shown on homepage|`true`|
|`isFlashSale`|`boolean`|Whether part of flash sale|`false`|
|`createdAt`|`Timestamp`|When the product was added|`Timestamp(...)`|
|`reviews`|`array`|List of reviews with user and text keys|`[{"user":"John","text":"Great!"},{"user":"Anika","text":"Loved it!"}]`|

---

### `orders` Collection

Stores customer orders.

| Field              | Type        | Description                                                   | Example                                                                                                |
| ------------------ | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `uid`              | `string`    | UID of the customer (from `users`)                            | `"a1b2c3d4e5f6"`                                                                                       |
| `items`            | `array`     | Array of purchased items (productId, name, qty, price, image) | `[{"productId":"prod_123","name":"Oversized Tee","quantity":2,"price":999,"image":"url"}]`             |
| `total`            | `number`    | Total order cost (including product shipping fees)            | `2048.00`                                                                                              |
| `status`           | `string`    | Current order status                                          | `"Processing"`                                                                                         |
| `statusHistory`    | `array`     | List of status updates with timestamps                        | `[{"status":"Pending","timestamp":Timestamp(...)},{"status":"Processing","timestamp":Timestamp(...)}]` |
| `createdAt`        | `Timestamp` | When the order was created                                    | `Timestamp(...)`                                                                                       |
| `shippingFullName` | `string`    | Recipient’s full name                                         | `"Anika Rahman"`                                                                                       |
| `shippingAddress`  | `string`    | Street address                                                | `"House 12, Road 5, Dhanmondi"`                                                                        |
| `shippingCity`     | `string`    | City                                                          | `"Dhaka"`                                                                                              |
| `shippingDistrict` | `string`    | District                                                      | `"Dhaka"`                                                                                              |
|`shippingPhone`|`string`|Contact phone number|`"+8801987654321"`|
|`paymentMethod`|`string`|Payment method (`cod`, `bkash`, `nagad`, `card`)|`"bkash"`|
|`paymentStatus`|`string`|Payment status (`pending`, `paid`)|`"pending"`|
