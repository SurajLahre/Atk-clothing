import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { convertToINR } from '../../utils/formatCurrency';

// Sample initial data
const initialProducts = [
  {
    id: uuidv4(),
    title: 'ATKU Classic T-Shirt',
    description: 'Premium cotton t-shirt with ATKU logo on the front. Comfortable fit for everyday wear.',
    price: convertToINR(29.99), // ₹2,249.25
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    inStock: true,
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'ATKU Hoodie',
    description: 'Warm and stylish hoodie with ATKU embroidered logo. Perfect for cooler weather.',
    price: convertToINR(49.99), // ₹3,749.25
    category: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1578768079050-7b3a5ec23b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Maroon'],
    inStock: true,
    featured: false,
  },
  {
    id: uuidv4(),
    title: 'ATKU Denim Jacket',
    description: 'Stylish denim jacket with ATKU patches. A statement piece for your wardrobe.',
    price: convertToINR(79.99), // ₹5,999.25
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
  },
  {
    id: uuidv4(),
    title: 'ATKU Cap',
    description: 'Adjustable cap with embroidered ATKU logo. One size fits most.',
    price: convertToINR(24.99), // ₹1,874.25
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    featured: false,
  },
];

// Load products from localStorage if available
const loadProducts = () => {
  try {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return initialProducts;
  }
};

const initialState = {
  products: loadProducts(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: null,
    priceRange: { min: 0, max: 75000 }, // 0 to ₹75,000
    searchQuery: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: uuidv4(),
        ...action.payload,
      };
      state.products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    updateProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updates };
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: 75000 }, // 0 to ₹75,000
        searchQuery: '',
      };
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setFilters, clearFilters } = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find(product => product.id === productId);
export const selectFeaturedProducts = (state) =>
  state.products.products.filter(product => product.featured);
export const selectFilters = (state) => state.products.filters;

export const selectFilteredProducts = (state) => {
  const { products } = state.products;
  const { category, priceRange, searchQuery } = state.products.filters;

  return products.filter(product => {
    // Filter by category
    if (category && product.category !== category) return false;

    // Filter by price range
    if (product.price < priceRange.min || product.price > priceRange.max) return false;

    // Filter by search query
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });
};

export default productSlice.reducer;
