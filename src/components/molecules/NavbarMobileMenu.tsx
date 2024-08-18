import { signOutAction } from "@/src/lib/actions";
import { cn } from "@/src/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavbarMobileMenuProps = {
  isAdmin: boolean;
  isLogged: boolean;
  totalQuantity: number;
  isDemoMode: boolean;
};

export default function NavbarMobileMenu({
  isAdmin,
  isLogged,
  totalQuantity,
  isDemoMode,
}: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleSignOut = async () => {
    await signOutAction();
    setIsOpen((open) => !open);
  };

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
          className={cn(
            "flex flex-col gap-3  absolute inset-x-0 top-12 bg-white h-fit py-6 dark:bg-black",
            isDemoMode && "top-24"
          )}
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

          {isAdmin && (
            <li>
              <Link
                href="/dashboard"
                className="text-green-700 hover:text-green-800"
                onClick={handleOpen}
              >
                Dashboard
              </Link>
            </li>
          )}

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
              <button
                className="hover:text-green-800"
                type="submit"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            )}
          </li>

          {isLogged && (
            <li>
              <Link
                href="/user/account"
                className=" hover:text-green-800"
                onClick={handleOpen}
              >
                Account
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/cart"
              className=" hover:text-green-800"
              onClick={handleOpen}
            >
              Cart ({totalQuantity})
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
