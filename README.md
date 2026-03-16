# Applesque

The premium ecommerce web app showcasing real Apple products.

AppleProducts is a portfolio-focused, mobile-first web app designed to demonstrate modern React, TypeScript, and Next.js capabilities. It emphasizes a clean, minimal, and extremely premium layout, complete with browsing real Apple products, search, cart functionality, and light/dark mode — all optimized for both mobile and desktop experiences.

Free to explore. No backend required for now.

## What Problem Does AppleProducts Solve?

Building a visually polished ecommerce interface is challenging, especially when balancing mobile-first design, responsive layouts, and premium aesthetics. AppleProducts provides a fully functional frontend skeleton that demonstrates:

- Browsing real Apple products across categories
- Product detail views with descriptions, images, and pricing
- Cart management with add/remove/update functionality
- Light and dark themes
- Mobile-first navigation with bottom bar, desktop top navigation, and category pages

It’s an ideal showcase for portfolio projects or learning modern frontend architecture.

## Features

### Product Browsing
- **Product Listing Page** - Grid layout displaying real Apple products, searchable, filterable by category and price, with sorting options (low-high, high-low, newest, popular)
- **Product Details Page** - Full product image, description, price, add/remove/update cart functionality

### Cart Management
- **Cart Page** - Displays all cart items, quantities, subtotal, and checkout mock flow
- **Global State** - Managed with Zustand for seamless updates across pages

### Navigation
- **Mobile** - Persistent bottom navigation: Home, Products, Cart, Profile placeholder
- **Desktop** - Minimal top navigation: logo left, search center, cart right; additional navigation for Categories, Products, Sales pages

### UI / UX
- Light and dark mode with system preference detection
- Premium color palette: blacks, charcoals, grays, light grays, whites
- Mobile-first responsive design, scales beautifully to desktop
- Clean, minimal, product-focused aesthetic

### Sample Data
- Includes a larger set of real Apple products to demonstrate variety, categories, filters, and sorting

## Tech Stack
- **Frontend:** Next.js, React, TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS or Styled Components (consistent approach)
- **Optional:** TanStack Query or simple fetch for mock API data

## Planned Features
- **User accounts and authentication**
- **Checkout integration**
- **Advanced filters and sorting by product specifications**
- **Product comparison**
- **Wishlist / favorites functionality**
- **Backend integration for real-time product data**
- **Reviews / ratings** - Users can rate and leave reviews for products
- **3D product viewer / AR preview** - Interactive 3D previews of products
- **Bundle suggestions** - “Frequently bought together” product recommendations
- **Admin dashboard mock** - Mock interface to manage products, orders, and users
- **Recently viewed products** - Tracks user activity for personalized suggestions
- **Smart search suggestions** - Auto-complete with product hints
- **AI-powered recommendations** - Suggests best solutions and cheapest products according to user budget


## Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd AppleProducts

# Install dependencies
npm install

# Start the development server
npm run dev


