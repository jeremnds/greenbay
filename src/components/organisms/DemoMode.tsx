"use client";

import { usePathname } from "next/navigation";

export default function DemoMode() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";
  const pathname = usePathname();

  const isCheckoutPage = pathname === "/checkout";
  if (!isDemoMode) return null;

  return (
    <div className="sticky top-20 left-0 w-full h-12 z-50 text-sm text-center md:text-md lg:text-lg bg-slate-800 dark:bg-stone-900  text-white flex justify-center items-center">
      👋 Mode démo activé :{" "}
      {!isCheckoutPage
        ? "Connexion requise pour accéder au dashboard. Modification des produits et catégories désactivée."
        : "Utilisez le numéro de carte  4242 4242 4242 4242 pour finaliser votre commande."}
    </div>
  );
}
