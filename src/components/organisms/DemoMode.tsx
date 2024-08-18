"use client";

import { usePathname } from "next/navigation";

export default function DemoMode() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";
  const pathname = usePathname();

  const isCheckoutPage = pathname === "/checkout";
  if (!isDemoMode) return null;

  return (
    <div className="sticky top-20 left-0 w-full h-12 z-50  text-center text-xs md:text-md lg:text-lg bg-slate-800 dark:bg-stone-900  text-white flex justify-center items-center">
      👋 Demo Mode:{" "}
      {!isCheckoutPage
        ? "Login is required to access the dashboard. The ability to modify products and categories has been disabled."
        : "Use the card number 4242 4242 4242 4242 to complete your order."}
    </div>
  );
}
