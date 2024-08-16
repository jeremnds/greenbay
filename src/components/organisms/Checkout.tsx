import { convertToSubcurrency } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cartStore";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Separator } from "../atoms/Separator";
import Spinner from "../atoms/Spinner";
import CheckoutList from "./CheckoutList";

export default function Checkout({ totalPrice }: { totalPrice: number }) {
  const { data: session } = useSession();
  const customerId = session?.user.customerId;
  const cart = useCartStore((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");

  const [loading, setLoading] = useState(false);

  if (!cart.length || totalPrice < 0) router.push("/");

  useEffect(() => {
    if (totalPrice > 0 && cart.length) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice: convertToSubcurrency(totalPrice),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          setErrorMessage("Failed to initialize payment. Please try again.");
        });
    } else {
      router.push("/");
    }
  }, [totalPrice]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe elements not loaded correctly.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found.");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message);
      setLoading(false);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      try {
        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice,
            cart,
            customerId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push(`/order-summary?order_id=${data.orderId}&first`);
        } else {
          setErrorMessage("Order creation failed. Please contact support.");
        }
      } catch (orderError) {
        console.error("Error creating order:", orderError);
        setErrorMessage(
          "Failed to create order after payment. Please contact support."
        );
      }
    } else {
      console.error("Payment was not successful or paymentIntent not found.");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="mt-28">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 gap-8 sm:flex-row">
      <CheckoutList />
      <Separator orientation="vertical" />
      <form onSubmit={handleSubmit} className="flex-1">
        {clientSecret && <CardElement />}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
