import Link from "next/link";
import { buttonVariants } from "../atoms/Button";

export default function NoCart() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-8 ">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
        It looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Link href="/products" className={buttonVariants()}>
        Start Shopping
      </Link>
    </div>
  );
}
