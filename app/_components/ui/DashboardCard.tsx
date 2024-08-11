import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

type DashboardCardProps = {
  cardTitle: "Products" | "Categories" | "Users";
  href: string;
  children: ReactNode;
};

export default function DashboardCard({
  cardTitle,
  href,
  children,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-green-800">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={href}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          Add new
        </Link>
      </CardFooter>
    </Card>
  );
}
