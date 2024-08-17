"use client";

import PageContainer from "@/src/components/atoms/PageContainer";
import Spinner from "@/src/components/atoms/Spinner";
import Checkout from "@/src/components/organisms/Checkout";
import { convertToSubcurrency } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cartStore";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? undefined
);

export default function Page() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const { theme, systemTheme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart !== undefined && totalPrice !== undefined) {
      if (cart.length === 0 || totalPrice < 0) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }
  }, [cart, totalPrice, router]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageContainer>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPrice),
          currency: "usd",
          appearance: {
            theme:
              theme === "dark"
                ? "night"
                : theme === "system"
                ? systemTheme === "dark"
                  ? "night"
                  : "stripe"
                : "stripe",
          },
        }}
      >
        <Checkout totalPrice={totalPrice} />
      </Elements>
    </PageContainer>
  );
}
