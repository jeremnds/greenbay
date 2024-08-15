"use client";

import { useCartStore } from "@/src/store/cartStore";
import CheckoutItem from "../molecules/CheckoutItem";

export default function CheckoutList() {
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      {cart.length > 0 && (
        <>
          <div className="">
            <ul className="space-y-4">
              {cart.map((checkoutItem) => (
                <CheckoutItem
                  key={checkoutItem.product_id}
                  checkoutItem={checkoutItem}
                />
              ))}
            </ul>
          </div>
          <div>
            <h3>Total: </h3>
            <p></p>
          </div>
        </>
      )}
    </>
  );
}
