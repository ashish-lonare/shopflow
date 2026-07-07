import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './types';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isShippingIncluded: false } as CartState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item: CartItem) => item.productId === action.payload.productId,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: number }>) {
      const index = state.items.findIndex(
        (item: CartItem) => item.productId === action.payload.productId,
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    clearCart(state) {
      state.items = [];
    },

    toggleShippingIncluded(state) {
      state.isShippingIncluded = !state.isShippingIncluded;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, toggleShippingIncluded } = cartSlice.actions;

export default cartSlice.reducer;
