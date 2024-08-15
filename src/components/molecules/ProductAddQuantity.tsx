"use client";

import { ProductType } from "@/src/models/product.type";

import { useCartStore } from "@/src/store/cartStore";
import { Session } from "next-auth";
import { useState } from "react";
import { Button } from "../atoms/Button";
import NumberField from "../atoms/NumberField";

type ProductAddQuantityProps = {
  session: Session | null;
  product: ProductType;
};

export default function ProductAddQuantity({
  session,
  product,
}: ProductAddQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  let customerId = 1;
  if (session?.user) customerId = session.user.customerId;

  const item = {
    user_id: customerId,
    product_id: product.id,
    quantity,
    price: product.price,
  };

  function handleDecrement() {
    setQuantity((value) => (value > 1 ? value - 1 : value));
  }

  function handleIncrement() {
    setQuantity((value) => value + 1);
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <NumberField
        quantity={quantity}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <Button
        className="rounded-full border border-input hover:bg-green-900/95 hover:text-white px-8 uppercase "
        variant="ghost"
        onClick={() => addItem(item)}
      >
        Add to cart
      </Button>
    </div>
  );
}
