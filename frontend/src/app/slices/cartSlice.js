import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      saveToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      saveToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveToLocalStorage(state.items);
    },
    loadCartFromLocalStorage: (state) => {
      state.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, loadCartFromLocalStorage } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;
