import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if available
const loadCart = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { items: [], totalItems: 0, totalAmount: 0 };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [], totalItems: 0, totalAmount: 0 };
  }
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, size, color } = action.payload;
      
      // Check if the item already exists in the cart with the same size and color
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          quantity,
          size,
          color,
        });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      
      // Find the specific item with matching id, size, and color
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size && item.color === color
      );
      
      if (itemIndex >= 0) {
        // Remove the item
        state.items.splice(itemIndex, 1);
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      
      // Find the specific item
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size && item.color === color
      );
      
      if (itemIndex >= 0) {
        // Update quantity
        state.items[itemIndex].quantity = quantity;
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
