import { useCartStore } from "@/src/store/cartStore";
import { Button } from "../atoms/Button";

type CartTotalProps = {
  totalPrice: number | null;
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
          <Button
            variant="destructive"
            className="px-5 py-6"
            onClick={clearCart}
          >
            Clear cart
          </Button>
          <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
