"use client";

import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./Button";

export default function CheckoutButton() {
  return (
    <Link
      href="/checkout"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        " bg-gray-700 text-sm text-gray-100 transition hover:bg-gray-600"
      )}
    >
      Checkout
    </Link>
  );
}
