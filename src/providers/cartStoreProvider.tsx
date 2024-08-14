// "use client";

// import { CartStore, createCartStore } from "@/src/store/cartStore";
// import { createContext, ReactNode, useContext, useRef } from "react";
// import { useStore } from "zustand";

// export type CartStoreApi = ReturnType<typeof createCartStore>;

// export const CartStoreContext = createContext<CartStoreApi | undefined>(
//   undefined
// );

// export interface CartStoreProviderProps {
//   children: ReactNode;
// }

// export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
//   const storeRef = useRef<CartStoreApi>();

//   if (!storeRef.current) {
//     storeRef.current = createCartStore(); // Initialize the store
//   }

//   return (
//     <CartStoreContext.Provider value={storeRef.current}>
//       {children}
//     </CartStoreContext.Provider>
//   );
// };

// export const useCartStore = <T,>(selector: (state: CartStore) => T): T => {
//   const store = useContext(CartStoreContext);

//   if (!store) {
//     throw new Error("useCartStore must be used within CartStoreProvider");
//   }

//   // Use Zustand's useStore directly with the selector
//   return useStore(store, selector);
// };
