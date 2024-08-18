import { signOutAction } from "@/src/lib/actions";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type NavBarMenuProps = {
  isAdmin: boolean;
  isLogged: boolean;
  totalQuantity: number;
};

export default function NavBarMenu({
  isAdmin,
  isLogged,
  totalQuantity,
}: NavBarMenuProps) {
  return (
    <div className="hidden md:flex items-center">
      <div className="flex justify-between items-center lg:w-72 w-64 ">
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

        {isLogged && (
          <li>
            <Link href="/user/account" className=" hover:text-green-800">
              <User />
            </Link>
          </li>
        )}

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
  );
}
