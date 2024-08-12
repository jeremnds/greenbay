import PageContainer from "@/src/components/atoms/PageContainer";
import Spinner from "@/src/components/atoms/Spinner";
import SearchBar from "@/src/components/molecules/SearchBar";
import ProductList from "@/src/components/organisms/ProductList";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getProductsWithPagination } from "@/src/queries/getProductsWithPagination.query";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/products?page=1");
  }

  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE
  );
  return (
    <PageContainer>
      <SearchBar />
      <Suspense fallback={<Spinner />} key={currentPage}>
        <ProductList
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Suspense>
    </PageContainer>
  );
}
