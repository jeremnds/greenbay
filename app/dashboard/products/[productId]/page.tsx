import { getProduct } from "@/app/_lib/services";
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

  const product = await getProduct(productId);
  console.log(product);

  return <div>Product {productId} </div>;
}
