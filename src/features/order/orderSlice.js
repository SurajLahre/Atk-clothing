import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { clearCart } from '../cart/cartSlice';

// Load orders from localStorage if available
const loadOrders = () => {
  try {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return [];
  }
};

const initialState = {
  orders: loadOrders(),
  status: 'idle',
  error: null,
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      const newOrder = {
        id: uuidv4(),
        ...action.payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
      state.status = 'succeeded';
      
      // Save to localStorage
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    createOrderFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].updatedAt = new Date().toISOString();
        
        // Save to localStorage
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatus,
  clearCurrentOrder,
} = orderSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderById = (state, orderId) => 
  state.orders.orders.find(order => order.id === orderId);
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderStatus = (state) => state.orders.status;
export const selectOrderError = (state) => state.orders.error;

// Selectors for admin dashboard
export const selectOrdersByStatus = (state, status) => 
  state.orders.orders.filter(order => order.status === status);
export const selectRecentOrders = (state, limit = 5) => 
  [...state.orders.orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

// Thunk for creating an order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderStart());
    
    // In a real app, you would make an API call here
    // For demo purposes, we'll just create the order locally
    
    dispatch(createOrderSuccess(orderData));
    
    // Clear the cart after successful order
    dispatch(clearCart());
    
    return { success: true, orderId: orderData.id };
  } catch (error) {
    dispatch(createOrderFailure(error.message || 'Failed to create order'));
    return { success: false, error: error.message || 'Failed to create order' };
  }
};

export default orderSlice.reducer;
