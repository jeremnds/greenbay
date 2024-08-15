import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItemType } from "../models/cartItem.type";

export type CartState = {
  cart: CartItemType[];
  totalPrice: number;
};

export type CartActions = {
  addItem: (item: CartItemType) => void;
  removeItem: (user_id: number, product_id: number) => void;
  updateQuantity: (
    user_id: number,
    product_id: number,
    quantity: number
  ) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore: CartState = {
  cart: [],
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      ...initCartStore,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.user_id === item.user_id &&
              cartItem.product_id === item.product_id
          );
          let updatedCart;
          if (existingItem) {
            updatedCart = state.cart.map((cartItem) =>
              cartItem.user_id === item.user_id &&
              cartItem.product_id === item.product_id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            );
          } else {
            updatedCart = [...state.cart, item];
          }

          const newTotalPrice = updatedCart
            .reduce(
              (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
              0
            )
            .toFixed(2);

          return {
            cart: updatedCart,
            totalPrice: parseFloat(newTotalPrice),
          };
        });
      },
      removeItem: (user_id, product_id) => {
        set((state) => {
          const updatedCart = state.cart.filter(
            (cartItem) =>
              cartItem.user_id !== user_id || cartItem.product_id !== product_id
          );

          const newTotalPrice = updatedCart
            .reduce(
              (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
              0
            )
            .toFixed(2);

          return {
            cart: updatedCart,
            totalPrice: parseFloat(newTotalPrice),
          };
        });
      },
      updateQuantity: (user_id, product_id, quantity) => {
        set((state) => {
          const updatedCart = state.cart.map((cartItem) =>
            cartItem.user_id === user_id && cartItem.product_id === product_id
              ? { ...cartItem, quantity }
              : cartItem
          );

          const newTotalPrice = updatedCart
            .reduce(
              (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
              0
            )
            .toFixed(2);

          return {
            cart: updatedCart,
            totalPrice: parseFloat(newTotalPrice),
          };
        });
      },
      clearCart: () => set(() => ({ cart: [], totalPrice: 0 })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
