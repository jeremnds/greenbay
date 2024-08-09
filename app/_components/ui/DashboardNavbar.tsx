"use client";

import { cn } from "@/app/_lib/utils";
import { BookOpen, House, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const navLinks = [
    {
      name: "Home",
      href: "/dashboard",
      icon: <House />,
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: <ShoppingBasket />,
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <BookOpen />,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <User />,
    },
  ];
  const pathName = usePathname();
  return (
    <div className="border-r-2 border-gray-20000 h-screen">
      <div className="">
        <ul className="text-black flex flex-col gap-6 md:gap-2 items-center md:items-start ">
          {navLinks.map((link) => (
            <li key={link.name} className="md:w-full ">
              <Link
                href={link.href}
                className={cn(
                  "hover:text-green-600 flex gap-6 items-center md:px-6 md:py-4 md:hover:bg-secondary",
                  { "md:bg-secondary text-green-600": link.href === pathName }
                )}
              >
                {link.icon}
                <span className="hidden md:block">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
