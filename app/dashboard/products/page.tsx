import NoItem from "@/src/components/atoms/NoItem";
import TableSkeleton from "@/src/components/atoms/TableSkeleton";
import Pagination from "@/src/components/molecules/Pagination";
import ProductTable from "@/src/components/organisms/ProductTable";
import SearchHeader from "@/src/components/organisms/SearchHeader";

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
    query?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/dashboard/products?page=1");
  }

  const query = searchParams?.query || "";

  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE,
    query
  );

  return (
    <>
      <SearchHeader className="mb-8" query={query} />

      {products.length > 0 ? (
        <Suspense fallback={<TableSkeleton />} key={`${currentPage}-${query}`}>
          <ProductTable products={products} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
      ) : (
        <NoItem itemName="product" />
      )}
    </>
  );
}
