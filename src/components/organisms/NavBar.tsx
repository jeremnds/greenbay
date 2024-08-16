"use client";

import { signOutAction } from "@/src/lib/actions";
import { useCartStore } from "@/src/store/cartStore";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PageContainer from "../atoms/PageContainer";
import { ThemeToggle } from "../molecules/ThemeToggle";

type NavBarProps = {
  isLogged: boolean;
};

export default function NavBar({ isLogged }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  const cart = useCartStore((state) => state.cart);
  const totalQuantity =
    cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="sticky z-50 bg-blur bg-white/75 backdrop-blur-lg border-gray-100 dark:border-slate-950/70 border-b transition-all h-20 w-full flex items-center justify-between top-0 dark:bg-black/75">
      <PageContainer>
        <div className="hidden md:flex items-center">
          <div className="flex justify-between items-center md:w-72 w-64 ">
            <Link
              href="/"
              className="font-semibold text-lg text-green-800 uppercase tracking-tight"
            >
              <span className="font-extrabold py-1 px-0.5 bg-green-500 text-white">
                Green
              </span>
              Bay
            </Link>
            <ul className="flex gap-6 ">
              <li>
                <Link href="/" className=" hover:text-green-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className=" hover:text-green-800">
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <ul className="flex gap-6 ml-auto items-center">
            <li>
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="text-green-700 hover:text-green-800"
                >
                  Dashboard
                </Link>
              )}
            </li>
            <li>
              {!isLogged ? (
                <Link href="/login" className=" hover:text-green-800">
                  Sign in
                </Link>
              ) : (
                <form action={signOutAction}>
                  <button className=" hover:text-green-800">Sign out</button>
                </form>
              )}
            </li>
            <li>
              {isLogged && (
                <Link href="/user/account" className=" hover:text-green-800">
                  <User />
                </Link>
              )}
            </li>
            <li>
              <Link href="/cart" className=" hover:text-green-800 relative">
                <ShoppingCart />
                <span className="absolute px-1 translate-x-1/2 text-xs bg-black text-white rounded-full top-0 right-0 dark:bg-white dark:text-black">
                  {totalQuantity}
                </span>
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
        {/* MOBILE */}
        <div className="flex md:hidden justify-between   relative">
          <div className="flex  items-center w-full">
            <Link
              href="/"
              className="font-semibold text-lg text-green-800 uppercase tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-extrabold py-1 px-0.5 bg-green-500 text-white">
                Green
              </span>
              Bay
            </Link>
            <div className="flex gap-4 items-center ml-auto">
              {!isOpen ? (
                <Menu
                  onClick={handleOpen}
                  className="hover:cursor-pointer hover:text-green-900"
                />
              ) : (
                <X
                  onClick={handleOpen}
                  className=" hover:cursor-pointer hover:text-green-900"
                />
              )}
              <ThemeToggle />
            </div>
          </div>

          {isOpen && (
            <ul
              className="flex flex-col gap-3  absolute inset-x-0 top-12 bg-white h-fit py-6 dark:bg-black  "
              ref={menuRef}
            >
              <li>
                <Link
                  href="/"
                  className=" hover:text-green-800"
                  onClick={handleOpen}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className=" hover:text-green-800"
                  onClick={handleOpen}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-green-700 hover:text-green-800"
                  onClick={handleOpen}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {!isLogged ? (
                  <Link
                    href="/login"
                    className=" hover:text-green-800"
                    onClick={handleOpen}
                  >
                    Sign in
                  </Link>
                ) : (
                  <form action={signOutAction}>
                    <button
                      className="hover:text-green-800"
                      type="submit"
                      onClick={() => handleOpen}
                    >
                      Sign out
                    </button>
                  </form>
                )}
              </li>
              <li>
                {isLogged && (
                  <Link href="/user/account" className=" hover:text-green-800">
                    Account
                  </Link>
                )}
              </li>
              <li>
                <Link
                  href="/cart"
                  className=" hover:text-green-800"
                  onClick={handleOpen}
                >
                  Cart
                </Link>
              </li>
            </ul>
          )}
        </div>
      </PageContainer>
    </header>
  );
}
