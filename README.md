# Product Management Dashboard

A modern, responsive Product Management Dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive product management capabilities with beautiful analytics, real-time search, and smooth animations.

## ✨ Features

### Core Functionality
- **Product CRUD Operations**
  - ✅ View all products in a beautiful grid layout
  - ✅ Add new products with a modern form modal
  - ✅ Edit existing products
  - ✅ Delete products with confirmation modal

- **Advanced Search & Filtering**
  - 🔍 Real-time search with debouncing (300ms delay)
  - 📂 Category-based filtering
  - 🎯 Combined search and filter functionality
  - 🧹 Quick clear filters option

- **Analytics Dashboard**
  - 📊 Category Distribution (Interactive Pie Chart)
  - 📈 Rating Distribution (Bar Chart)
  - 💰 Price Statistics (Average, Min, Max)
  - 📦 Total Products Count
  - 🏆 Top Categories with Progress Bars

- **Modern UI/UX**
  - 🎨 Built with Tailwind CSS and Shadcn UI
  - 📱 Fully responsive (Mobile, Tablet, Desktop)
  - ✨ Smooth scroll animations (Fade-in + Slide-up)
  - 🎯 Hover effects and transitions
  - ♿ Accessible components

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 3.4.19
- **UI Components:** Shadcn UI
- **Charts:** ApexCharts 5.3.6
- **HTTP Client:** Axios 1.13.2
- **Icons:** Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task1_PM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Getting Started

1. The app will automatically fetch products from the Fake Store API on load
2. Use the search bar to filter products by name
3. Select a category from the dropdown to filter by category
4. Click "Add Product" to create a new product
5. Click "Edit" on any product card to modify it
6. Click "Delete" to remove a product (with confirmation)

## 📁 Project Structure

```
task1_PM/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── progress.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── SearchBar.tsx
│   │   ├── DeleteModal.tsx
│   │   ├── AnalyticsSection.tsx
│   │   ├── CategoryDistributionChart.tsx
│   │   ├── RatingDistributionChart.tsx
│   │   ├── TopCategories.tsx
│   │   ├── MetricCard.tsx
│   │   └── AnalyticsCard.tsx
│   ├── hooks/
│   │   └── useIntersectionObserver.ts
│   ├── services/
│   │   └── api.ts           # API service functions
│   ├── types/
│   │   └── product.ts       # TypeScript interfaces
│   ├── utils/
│   │   └── analytics.ts     # Analytics calculation functions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── components.json          # Shadcn UI configuration
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🎨 Key Features Explained

### Scroll Animations
Products animate into view with a smooth fade-in and slide-up effect using Intersection Observer API. Cards appear with staggered delays for a professional cascade effect.

### Debounced Search
Search input is debounced (300ms) to reduce unnecessary filtering operations, providing a smooth user experience while typing.

### Analytics Dashboard
Comprehensive analytics including:
- Interactive pie charts showing category distribution
- Bar charts for rating analysis
- Price statistics and metrics
- Top categories with visual progress indicators

### Responsive Design
- Mobile-first approach
- Grid layouts adapt from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly buttons and inputs
- Optimized spacing for all screen sizes

## 🔌 API Integration

This application uses the [Fake Store API](https://fakestoreapi.com/products) for product data:

- **Base URL:** `https://fakestoreapi.com/products`
- **GET** - Fetch all products
- **POST** - Add new product (mocked)
- **PUT** - Update product
- **DELETE** - Delete product

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Deploy to production**
   ```bash
   vercel --prod
   ```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🎯 Future Enhancements

- [ ] Add pagination for large product lists
- [ ] Implement sorting (by price, rating, name)
- [ ] Add product image upload functionality
- [ ] Implement user authentication
- [ ] Add favorites/wishlist feature
- [ ] Export products to CSV/JSON
- [ ] Dark mode toggle
- [ ] Advanced filtering options

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Author

Created as part of the Front-End Developer assessment for Intricare Technologies.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing mock product data
- [Shadcn UI](https://ui.shadcn.com/) for beautiful component library
- [ApexCharts](https://apexcharts.com/) for interactive charts
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
