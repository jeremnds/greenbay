import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
  user_id: number;
  product_id: number;
  quantity: number;
}[];

const initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        user_id: number;
        product_id: number;
        quantity: number;
      }>
    ) => {
      const item = action.payload;
      const existingItem = state.find(
        (cartItem) =>
          cartItem.user_id === item.user_id &&
          cartItem.product_id === item.product_id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.push(item);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ user_id: number; product_id: number }>
    ) => {
      return state.filter(
        (cartItem) =>
          cartItem.user_id !== action.payload.user_id ||
          cartItem.product_id !== action.payload.product_id
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        user_id: number;
        product_id: number;
        quantity: number;
      }>
    ) => {
      const item = state.find(
        (cartItem) =>
          cartItem.user_id === action.payload.user_id &&
          cartItem.product_id === action.payload.product_id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
