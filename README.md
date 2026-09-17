# Office Interiors – Pre-Loved Furniture E-Commerce Platform

A commercial e-commerce web platform modeled after [Toqri.com](https://toqri.com/) ("Pre-Loved Furniture. Fresh Purpose. – Smart Furniture. Greener Tomorrow.") and tailored for **Office Interiors**.

Built with an executive pure white architectural theme (`#ffffff`), 100% responsive design for desktop, tablets, and smartphones (iOS Safari & Android Chrome), and a **WhatsApp Order Placement System** (`+91 77609 51238`).

---

## 🌟 Key Features

### 1. WhatsApp Order Placement Integration
- **Official WhatsApp Desk**: `+91 77609 51238`
- **Multi-Tab Order Checkout**:
  - **Tab 1 (Customer Details)**: Full Name, WhatsApp phone number, Email.
  - **Tab 2 (Delivery Address)**: Street Address, City, State, 6-digit PIN code, optional Company & GSTIN for 18% tax credit.
  - **Tab 3 (Payment & Review)**: Selectable payment modes (UPI / GPay / PhonePe QR, Credit/Debit Card Link, Bank Wire NEFT/RTGS, or Pay on Inspection in Bangalore) + delivery instructions.
- **Direct Dispatch**: Auto-generates structured WhatsApp order manifest with a unique Order ID (`#OI-77609-XXXX`), itemized table, and delivery address.
- **1-Click WhatsApp Quick Order**: Single-product fast order from the Cart Drawer, Quick View modal, and Deal of the Week.

### 2. Pure White Theme (`#ffffff`)
- Executive typography and balanced two-tier navigation.
- Category pills with hover and active indicators.
- Deal of the Week spotlight with ticking countdown timer.
- Dynamic sustainability eco-metrics counters (CO₂ saved, water conserved, commercial chairs diverted).
- Google Reviews verified testimonials showcase.
- Enterprise & startup furniture liquidation modal.

### 3. Native Mobile (iOS & Android) Experience
- **App-Style Bottom Navigation Bar**: Fixed bottom tab bar on mobile (`md:hidden`) with Home, Shop, Search, Wishlist (with badge), and Cart (with badge).
- **iOS Safe Area Support**: Full support for iPhone home indicator (`env(safe-area-inset-bottom)`).
- **Horizontal Swipeable Category Pills**: Smooth momentum scrolling (`-webkit-overflow-scrolling: touch`) across product categories.
- **2-Column Mobile Catalog Grid**: Space-efficient 2-column e-commerce grid on smartphones with 1:1 square image containers and touch-friendly Add to Cart actions.
- **Slide-Out Mobile Drawer**: Native app menu with categories, hotline, and liquidation actions.

### 4. Fast-Loading Performance
- Zero-dependency Node.js HTTP server (`serve.js`) with native Node `zlib` **gzip/deflate compression** (reduces payload by ~75%).
- High-speed HTTP caching (`Cache-Control: public, max-age=86400`) and `ETag` validation.
- Keystroke debouncing (100ms) for smooth 60fps search and filtering.
- Native `loading="lazy"` and `decoding="async"` across images.

---

## 🚀 How to Run Locally

### Using Node.js:
```bash
node serve.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Windows One-Click:
Double-click `start-server.bat`.

---

## 📁 Repository Structure
- `index.html` — Main HTML5 architecture and semantic layout.
- `styles.css` — Custom design system, responsive styles, modals, drawers, and animations.
- `products.js` — Catalog data (22 authentic certified products with specs, condition, and pricing).
- `app.js` — Interactive application logic (Cart, Wishlist, WhatsApp Order Modal, Search, Modals).
- `serve.js` — Zero-dependency Node.js server with compression and caching.
- `logo.jpeg` — Office Interiors brand asset.
