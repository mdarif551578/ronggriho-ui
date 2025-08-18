# Rong Griho - Application Blueprint

This document outlines the architecture, features, and technical specifications for the Rong Griho e-commerce platform.

## 1. Core Concept

Rong Griho is a modern e-commerce platform focused on providing a seamless shopping experience for Bangladeshi apparel and accessories. It combines contemporary design with traditional styles, featuring a user-friendly interface and robust functionality for both customers and administrators.

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

### Admin Panel
- **Dashboard**:
    - At-a-glance view of key metrics (to be implemented).
- **Product Management**:
    - View a list of all products.
    - Add new products (to be implemented).
    - Edit existing product details (name, price, description, etc.).
- **Order Management**:
    - View a list of all customer orders.
    - View order details and update status (to be implemented).
- **User Management**:
    - View a list of all registered users (to be implemented).
- **Secure Login**:
    - Separate login for administrators.

## 3. Technical Architecture

- **Framework**: Next.js 14+ with App Router.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
- **UI Components**: ShadCN UI for a consistent and accessible component library.
- **Database**: Google Firestore for storing product, order, and user data.
- **Authentication**: Firebase Authentication for both customer and admin users.
- **State Management**: React Context API for global state (cart, wishlist, auth). Client-side state is managed with React Hooks (`useState`, `useEffect`).
- **AI (Future)**: Genkit for potential generative AI features.

## 4. File Structure Highlights

- `src/app/`: Main application routes (App Router).
    - `(main)`: Group for customer-facing routes.
    - `admin`: Routes for the admin panel.
    - `api`: API routes (if any).
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
