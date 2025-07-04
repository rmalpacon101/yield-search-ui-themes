# Product Listing Page

This is a complete product listing page using the yield-search UI component with the following features:

## Features

### 🔍 Search & Filtering
- **Left sidebar filters** for desktop view
- **Mobile-responsive filter drawer** for smaller screens
- **Search box** with auto-suggestions
- **Category filters** with checkboxes
- **Price range filters** 
- **Brand filtering**
- **Clear all filters** functionality

### 📱 Responsive Design
- **Desktop**: Filters in left sidebar (25% width), products in main area (75% width)
- **Mobile**: Floating filter button with slide-out drawer
- **Tablet**: Optimized grid layout

### 🛍️ Product Display
- **Grid layout**: 1 column on mobile, 2 on tablet, 3 on desktop
- **Product cards** with:
  - Product image with fallback
  - Title with search highlighting
  - Brand information
  - Description with search highlighting
  - Star ratings display
  - Price with discount calculation
  - Stock status badges
  - Product tags
  - Action buttons (View, Add to Cart)

### ⚡ Advanced Features
- **Sort options**: Relevance, Price, Rating, Date, Name
- **Pagination** for large result sets
- **Results statistics** showing count and timing
- **Loading states** with spinner
- **Empty state** with helpful messaging
- **Discount badges** for products on sale

## Files Created

1. **`products.html`** - Main product listing page
2. **`products.js`** - JavaScript functionality and search configuration
3. **Updated `styles.css`** - Additional styles for product components

## Usage

1. Open `products.html` in your browser
2. The page will automatically load products using your search configuration
3. Use the search box to find specific products
4. Apply filters in the left sidebar (desktop) or mobile drawer
5. Sort results using the dropdown
6. Navigate through pages using pagination

## Search Response Format

The page is designed to work with the product data format you specified:

```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess...",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 10.48,
  "rating": 2.56,
  "stock": 99,
  "tags": ["beauty", "mascara"],
  "brand": "Essence",
  "availabilityStatus": "In Stock",
  "images": ["https://..."],
  "thumbnail": "https://..."
}
```

## Customization

You can customize the search by modifying `products.js`:

- **Add/remove filter fields** in the `filterOptions.templates` array
- **Modify sort options** in the `sortOptions` array
- **Update search fields** in the `fields` array
- **Customize product card template** in the `productTemplate` function
- **Add custom filter templates** for specific field types

## Interactive Features

- **Product View**: Click "View" button to see product details
- **Add to Cart**: Click "Add to Cart" to add products to cart
- **Filter Toggle**: Use the floating button on mobile to open filters
- **Real-time Search**: Search results update as you type
- **Filter Combination**: Multiple filters can be applied simultaneously
