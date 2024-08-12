import TableSkeleton from "@/src/components/atoms/TableSkeleton";
import Pagination from "@/src/components/molecules/Pagination";
import CategoriesTable from "@/src/components/organisms/CategoriesTable";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getCategoriesWithPagination } from "@/src/queries/getCategoriesWithPagination.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/dashboard/categories?page=1");
  }

  const currentPage = Number(searchParams?.page) || 1;

  const { categories, totalPages } = await getCategoriesWithPagination(
    currentPage,
    ITEMS_PER_PAGE
  );

  return (
    <>
      <Suspense fallback={<TableSkeleton />} key={currentPage}>
        <CategoriesTable categories={categories} />
      </Suspense>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
