import { cn } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cartStore";
import Link from "next/link";
import { Button, buttonVariants } from "../atoms/Button";

type CartTotalProps = {
  totalPrice: number;
};

export default function CartTotal({ totalPrice }: CartTotalProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  return (
    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
      <div className="w-screen  space-y-4">
        <dl className="space-y-0.5 text-sm text-gray-700 dark:text-gray-200">
          <div className="flex justify-between ml-auto max-w-lg !text-base font-medium">
            <dt>Total</dt>
            <dd>${totalPrice}</dd>
          </div>
        </dl>

        <div className="flex justify-between items-center">
          <Button variant="destructive" onClick={clearCart}>
            Clear cart
          </Button>
          <Link
            href="/checkout"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              " bg-gray-700 text-sm text-gray-100 transition hover:bg-gray-600"
            )}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
