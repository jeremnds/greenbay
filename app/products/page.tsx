import NoItem from "@/src/components/atoms/NoItem";
import PageContainer from "@/src/components/atoms/PageContainer";
import ProductList from "@/src/components/organisms/ProductList";
import SearchHeader from "@/src/components/organisms/SearchHeader";
import { auth } from "@/src/lib/auth";
import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { getProductsWithPagination } from "@/src/queries/getProductsWithPagination.query";
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
        <ProductList
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
          session={session}
        />
      ) : (
        <NoItem itemName="product" />
      )}
    </PageContainer>
  );
}
