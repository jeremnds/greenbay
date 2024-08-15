"use client";

import { useCartStore } from "@/src/store/cartStore";
import CheckoutItem from "../molecules/CheckoutItem";

export default function CheckoutList() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <>
      {cart.length > 0 && (
        <>
          <div className=" flex flex-col  gap-6">
            <ul className="space-y-4 ">
              {cart.map((checkoutItem) => (
                <CheckoutItem
                  key={checkoutItem.product_id}
                  checkoutItem={checkoutItem}
                />
              ))}
            </ul>
            <div>
              <h3 className="text-lg">Total </h3>
              <p className="text-sm">${totalPrice}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
