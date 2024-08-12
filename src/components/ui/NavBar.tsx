import { signOutAction } from "@/src/lib/actions";
import { auth } from "@/src/lib/auth";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import PageContainer from "./PageContainer";

export default async function NavBar() {
  const session = await auth();
  const isLogged = session?.user ? true : false;
  console.log(session);
  return (
    <header className="sticky z-50 bg-blur bg-white/75 backdrop-blur-lg border-gray-100 border-b transition-all h-20 w-full flex items-center justify-between top-0">
      <PageContainer>
        <div className="flex items-center">
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
          <ul className="flex gap-6 ml-auto">
            <li>
              <Link
                href="/dashboard"
                className="text-green-700 hover:text-green-800"
              >
                Dashboard
              </Link>
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
              <Link href="/cart" className=" hover:text-green-800">
                <ShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </PageContainer>
    </header>
  );
}
