import ProductsTable from "@/app/_components/ProductsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default function Page() {
  return <ProductsTable />;
}
