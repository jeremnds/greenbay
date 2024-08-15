"use client";

import PageContainer from "@/src/components/atoms/PageContainer";
import Checkout from "@/src/components/organisms/Checkout";
import { convertToSubcurrency } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cartStore";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? undefined
);

export default function Page() {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { theme, systemTheme } = useTheme();
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return (
    <PageContainer>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(total),
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
        <Checkout total={total} />
      </Elements>
    </PageContainer>
  );
}
