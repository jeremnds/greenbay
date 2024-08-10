import Spinner from "@/app/_components/ui/Spinner";
import UpdateProduct from "@/app/_components/UpdateProduct";
import { getCategories, getProduct } from "@/app/_lib/services";
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

  const [product, categories] = await Promise.all([
    getProduct(productId),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <UpdateProduct product={product} categories={categories} />
    </Suspense>
  );
}
