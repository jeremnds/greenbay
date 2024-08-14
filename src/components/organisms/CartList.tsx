"use client";

import { useAppSelector } from "@/src/lib/hooks";
import CartItem from "../molecules/CartItem";
import NoCart from "../molecules/NoCart";
import CartTotal from "./CartTotal";

export default function CartList() {
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = Number(
    cart
      .reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0)
      .toFixed(2)
  );

  return (
    <>
      {cart.length > 0 ? (
        <div className="mt-8">
          <ul className="space-y-4">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.product_id} cartItem={cartItem} />
            ))}
          </ul>

          <CartTotal totalPrice={totalPrice} />
        </div>
      ) : (
        <NoCart />
      )}
    </>
  );
}
