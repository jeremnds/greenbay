import Spinner from "@/src/components/atoms/Spinner";
import { getCategories } from "@/src/queries/getCategories.query";
import { getProduct } from "@/src/queries/getProduct.query";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductUpdate from "./ProductUpdate";

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
      <ProductUpdate product={product} categories={categories} />
    </Suspense>
  );
}
