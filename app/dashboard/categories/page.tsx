import NoItem from "@/src/components/atoms/NoItem";
import TableSkeleton from "@/src/components/atoms/TableSkeleton";
import Pagination from "@/src/components/molecules/Pagination";
import CategoriesTable from "@/src/components/organisms/CategoriesTable";
import SearchHeader from "@/src/components/organisms/SearchHeader";
import { auth } from "@/src/lib/auth";
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
    query?: string;
  };
}) {
  const session = await auth();
  if (!session || session?.user.role !== "admin") redirect("/");

  if (!searchParams?.page) {
    redirect("/dashboard/categories?page=1");
  }

  const query = searchParams?.query || "";

  const currentPage = Number(searchParams?.page) || 1;

  const { categories, totalPages } = await getCategoriesWithPagination(
    currentPage,
    ITEMS_PER_PAGE,
    query
  );

  return (
    <>
      <SearchHeader className="mb-8" query={query} />
      {categories.length > 0 ? (
        <Suspense fallback={<TableSkeleton />} key={currentPage}>
          <CategoriesTable categories={categories} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
      ) : (
        <NoItem itemName="category" />
      )}
    </>
  );
}
