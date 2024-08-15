"use client";

import PageContainer from "@/src/components/atoms/PageContainer";
import { useCartStore } from "@/src/store/cartStore";
import { useEffect } from "react";

export default function Page() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <PageContainer className=" flex flex-col justify-center items-center h-[calc(100vh-25rem)] gap-2">
      <h3 className="text-4xl font-extrabold text-center text-green-800">
        Payment Successful
      </h3>
      <p>
        Thank you for shopping with us! Your payment was processed and your
        order is confirmed.
      </p>
    </PageContainer>
  );
}
