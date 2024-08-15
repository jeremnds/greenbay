import { convertToSubcurrency } from "@/src/lib/utils";

import { useCartStore } from "@/src/store/cartStore";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Separator } from "../atoms/Separator";
import Spinner from "../atoms/Spinner";
import CheckoutList from "./CheckoutList";

export default function Checkout({ totalPrice }: { totalPrice: number }) {
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalPrice: convertToSubcurrency(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/success?amount=${totalPrice}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className=" mt-28  ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 gap-8 sm:flex-row">
      <CheckoutList />
      <Separator orientation="vertical" />
      <form onSubmit={handleSubmit} className="flex-1">
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
        <Button className="mt-8 w-full" disabled={!stripe || loading}>
          {!loading ? (
            `Pay $${totalPrice}`
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </form>
    </div>
  );
}
