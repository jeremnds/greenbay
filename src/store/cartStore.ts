import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItemType } from "../models/cartItem.type";

export type CartState = {
  cart: CartItemType[];
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
};

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      ...initCartStore,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.user_id === item.user_id &&
              cartItem.product_id === item.product_id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.user_id === item.user_id &&
                cartItem.product_id === item.product_id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + item.quantity,
                    }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        }),
      removeItem: (user_id, product_id) =>
        set((state) => ({
          cart: state.cart.filter(
            (cartItem) =>
              cartItem.user_id !== user_id || cartItem.product_id !== product_id
          ),
        })),
      updateQuantity: (user_id, product_id, quantity) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.user_id === user_id && cartItem.product_id === product_id
              ? { ...cartItem, quantity }
              : cartItem
          ),
        })),
      clearCart: () => set(() => ({ cart: [] })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
