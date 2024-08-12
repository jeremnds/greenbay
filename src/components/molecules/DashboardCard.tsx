import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "../atoms/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../atoms/Card";

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
      <CardContent className="lg:h-20">{children}</CardContent>
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
