import TableSkeleton from "@/src/components/atoms/TableSkeleton";
import Pagination from "@/src/components/molecules/Pagination";
import ProductsTable from "@/src/components/organisms/ProductsTable";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getProductsWithPagination } from "@/src/queries/getProductsWithPagination.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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

  const { products, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE
  );

  return (
    <>
      <Suspense fallback={<TableSkeleton />} key={currentPage}>
        <ProductsTable products={products} />
      </Suspense>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
