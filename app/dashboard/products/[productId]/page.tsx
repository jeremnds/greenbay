import ProductForm from "@/app/_components/ProductForm";
import { getCategories, getProduct } from "@/app/_lib/services";
import { Metadata } from "next";

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

  return <ProductForm product={product} categories={categories} />;
}
