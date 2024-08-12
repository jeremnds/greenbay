import Spinner from "@/src/components/ui/Spinner";
import UpdateProduct from "@/src/components/UpdateProduct";
import { getCategories, getProduct } from "@/src/lib/services";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product",
};

type ProductProps = {
  params: {
    productId: number;
  };
};

export default async function Page({ params }: ProductProps) {
  const { productId } = params;

  const [product, { categories }] = await Promise.all([
    getProduct(productId),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <UpdateProduct product={product} categories={categories} />
    </Suspense>
  );
}
