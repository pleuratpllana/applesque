# Applesque v1.0

The initial version of a premium ecommerce web app, intended to showcase real Apple products in the future.

AppleProducts v1.0 is a portfolio-focused, mobile-first web app built with **React and TypeScript**. Currently, it uses default demo products (living, home, and lifestyle items), but the goal is to replace them with **real Apple products** via a third-party API. It emphasizes a clean, minimal, and premium layout with browsing, search, cart functionality, **wishlist, product comparison, checkout, and advanced filters** — fully responsive for mobile and desktop.

Free to explore. No backend required for now.

## What Problem Does AppleProducts Solve?

Building a visually polished ecommerce interface is challenging, especially when balancing mobile-first design, responsive layouts, and premium aesthetics. AppleProducts v1.0 provides a fully functional frontend skeleton that demonstrates:

- Browsing products across categories  
- Product detail views with descriptions, images, and pricing  
- Cart management with add/remove/update functionality  
- Wishlist and product comparison features  
- Checkout integration  
- Advanced filters and sorting by product specifications  
- Light and dark themes  
- Mobile-first navigation with bottom bar, desktop top navigation, and category pages  

It’s an ideal showcase for portfolio projects or learning modern frontend architecture.

## Features

### Product Browsing
- **Product Listing Page** - Grid layout displaying demo products, searchable, filterable by category, specifications, and price, with sorting options (low-high, high-low, newest, popular)  
- **Product Details Page** - Full product image, description, price, add/remove/update cart functionality  

### Cart & Checkout
- **Cart Page** - Displays all cart items, quantities, subtotal, and checkout flow fully implemented  
- **Global State** - Managed with Zustand for seamless updates across pages  

### Wishlist & Product Comparison
- **Wishlist / Favorites** - Save favorite products  
- **Product Comparison** - Compare multiple products side by side  

### Navigation
- **Mobile** - Persistent bottom navigation: Home, Products, Cart, Profile placeholder  
- **Desktop** - Minimal top navigation: logo left, search center, cart right; additional navigation for Categories, Products, Sales pages  

### UI / UX
- Light and dark mode with system preference detection  
- Premium color palette: blacks, charcoals, grays, light grays, whites  
- Mobile-first responsive design, scales beautifully to desktop  
- Clean, minimal, product-focused aesthetic  

### Sample Data
- Default demo products included for now  
- Designed to be replaced with real Apple products in future versions  

## Tech Stack
- **Frontend:** React, TypeScript  
- **State Management:** Zustand  
- **Styling:** Tailwind CSS or Styled Components (consistent approach)  
- **Optional:** Simple fetch for mock API data  

## Planned Features
- Integration with real Apple products via API  
- User accounts and authentication  
- Backend integration for real-time product data  
- Reviews / ratings - Users can rate and leave reviews for products  
- 3D product viewer / AR preview - Interactive 3D previews of products  
- Bundle suggestions - “Frequently bought together” product recommendations  
- Admin dashboard mock - Mock interface to manage products, orders, and users  
- Recently viewed products - Tracks user activity for personalized suggestions  
- Smart search suggestions - Auto-complete with product hints  
- AI-powered recommendations - Suggests best solutions and cheapest products according to user budget  

## Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd AppleProducts

# Install dependencies
npm install

# Start the development server
npm start
