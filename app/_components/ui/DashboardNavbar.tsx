"use client";
import { navLinks } from "@/app/_lib/constants";
import { cn } from "@/app/_lib/utils";
import { BookOpen, House, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkName = "Home" | "Products" | "Categories" | "Users";

const iconMap: Record<NavLinkName, React.ComponentType> = {
  Home: House,
  Products: ShoppingBasket,
  Categories: BookOpen,
  Users: User,
};

export default function DashboardNavbar() {
  const pathName = usePathname();
  return (
    <div className="border-r-2 border-gray-20000 h-full text-green-800">
      <div className="">
        <ul className="text-black flex flex-col gap-6 md:gap-2 items-center md:items-start ">
          {navLinks.map((link) => {
            const Icon = iconMap[link.name as NavLinkName];
            return (
              <li key={link.name} className="md:w-full ">
                <Link
                  href={link.href}
                  className={cn(
                    "hover:text-green-600 flex gap-6 items-center md:px-6 md:py-4 md:hover:bg-secondary",
                    { "md:bg-secondary text-green-600": link.href === pathName }
                  )}
                >
                  <Icon />
                  <span className="hidden md:block">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
