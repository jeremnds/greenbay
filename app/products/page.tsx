import BackButton from "@/src/components/atoms/BackButton";
import NoProduct from "@/src/components/atoms/NoProduct";
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
    query?: string;
  };
}) {
  if (!searchParams?.page) {
    redirect("/products?page=1");
  }

  const query = searchParams?.query || "";

  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages } = await getProductsWithPagination(
    currentPage,
    ITEMS_PER_PAGE,
    query
  );
  return (
    <PageContainer>
      <div className="flex items-center  mt-8 ">
        {query && <BackButton />}
        <SearchBar />
      </div>

      {products.length > 0 ? (
        <Suspense fallback={<Spinner />} key={`${currentPage}-${query}`}>
          <ProductList
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      ) : (
        <NoProduct />
      )}
    </PageContainer>
  );
}
