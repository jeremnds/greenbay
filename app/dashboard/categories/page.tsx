import CategoriesTable from "@/app/_components/CategoriesTable";
import Pagination from "@/app/_components/ui/Pagination";
import TableSkeleton from "@/app/_components/ui/TableSkeleton";
import { ITEMS_PER_PAGE } from "@/app/_lib/constants";
import { getCategoriesWithPagination } from "@/app/_lib/services";
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
