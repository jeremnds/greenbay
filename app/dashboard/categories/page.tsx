import CategoriesTable from "@/src/components/CategoriesTable";
import Pagination from "@/src/components/ui/Pagination";
import TableSkeleton from "@/src/components/ui/TableSkeleton";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getCategoriesWithPagination } from "@/src/lib/getCategoriesWithPagination";
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
