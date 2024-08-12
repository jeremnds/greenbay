import ProductUpdate from "@/src/components/ProductUpdate";
import Spinner from "@/src/components/ui/Spinner";
import { getCategories } from "@/src/queries/getCategories.query";
import { getProduct } from "@/src/queries/getProduct.query";
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
      <ProductUpdate product={product} categories={categories} />
    </Suspense>
  );
}
