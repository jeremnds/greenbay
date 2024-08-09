import ProductsTable from "@/app/_components/ProductsTable";
import Pagination from "@/app/_components/ui/Pagination";
import { ITEMS_PER_PAGE } from "@/app/_lib/constants";
import { getProductsWithPagination } from "@/app/_lib/services";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/dashboard/products?page=1");
  }

  const currentPage = Number(searchParams?.page) || 1;

  const { products, count, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE
  );

  return (
    <>
      <ProductsTable products={products} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
