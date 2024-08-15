import { convertToSubcurrency } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cartStore";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Separator } from "../atoms/Separator";
import CheckoutList from "./CheckoutList";

export default function Checkout({ total }: { total: number }) {
  const cart = useCartStore((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, seterrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: convertToSubcurrency(total) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [total]);
  return (
    <div className="flex flex-col mt-8 gap-8 sm:flex-row">
      <CheckoutList />
      <Separator orientation="vertical" />
      <form action="" className="flex-1">
        {clientSecret && <PaymentElement />}
        <Button className="mt-8 w-full">Pay</Button>
      </form>
    </div>
  );
}
