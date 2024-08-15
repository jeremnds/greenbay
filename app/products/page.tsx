import NoItem from "@/src/components/atoms/NoItem";
import PageContainer from "@/src/components/atoms/PageContainer";
import Spinner from "@/src/components/atoms/Spinner";
import ProductList from "@/src/components/organisms/ProductList";
import SearchHeader from "@/src/components/organisms/SearchHeader";
import { auth } from "@/src/lib/auth";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getProductsWithPagination } from "@/src/queries/getProductsWithPagination.query";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/products?page=1");
  }

  const session = await auth();

  const query = searchParams?.query || "";

  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE,
    query
  );
  return (
    <PageContainer>
      <SearchHeader className="mt-8" query={query} />

      {products.length > 0 ? (
        <Suspense fallback={<Spinner />} key={`${currentPage}-${query}`}>
          <ProductList
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            session={session}
          />
        </Suspense>
      ) : (
        <NoItem itemName="product" />
      )}
    </PageContainer>
  );
}
