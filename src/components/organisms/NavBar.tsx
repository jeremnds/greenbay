"use client";

import { useCartStore } from "@/src/store/cartStore";
import { Session } from "next-auth";
import PageContainer from "../atoms/PageContainer";
import NavBarMenu from "../molecules/NavBarMenu";
import NavbarMobileMenu from "../molecules/NavbarMobileMenu";

type NavBarProps = {
  session: Session | null;
};

export default function NavBar({ session }: NavBarProps) {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  const isLogged = !!session?.user;

  let isAdmin;

  if (isDemoMode && isLogged) {
    isAdmin = true;
  } else {
    isAdmin = session?.user?.role === "admin" ?? false;
  }

  const cart = useCartStore((state) => state.cart);
  const totalQuantity =
    cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <header className="sticky z-50  bg-blur bg-white/75 backdrop-blur-lg border-gray-100 dark:border-slate-950/70 border-b transition-all h-20 w-full flex items-center justify-between top-0 dark:bg-black/75">
      <PageContainer>
        <NavBarMenu
          isAdmin={isAdmin}
          isLogged={isLogged}
          totalQuantity={totalQuantity}
        />
        <NavbarMobileMenu
          isAdmin={isAdmin}
          isLogged={isLogged}
          totalQuantity={totalQuantity}
          isDemoMode={isDemoMode}
        />
      </PageContainer>
    </header>
  );
}
