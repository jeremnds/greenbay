import Spinner from "@/src/components/atoms/Spinner";
import { auth } from "@/src/lib/auth";
import { ProductParamsType } from "@/src/models/productParams.type";
import { getCategories } from "@/src/queries/getCategories.query";
import { getProduct } from "@/src/queries/getProduct.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductUpdate from "./ProductUpdate";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Page({ params }: ProductParamsType) {
  const session = await auth();
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  if (!isDemoMode) {
    if (!session || session?.user?.role !== "admin") redirect("/");
  } else {
    if (!session) redirect("/");
  }

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
