"use client";

import { ProductsType } from "@/src/models/products.type";
import { Session } from "next-auth";
import Pagination from "../molecules/Pagination";
import ProductCard from "../molecules/ProductCard";

type ProductListProps = {
  products: ProductsType;
  totalPages: number;
  currentPage: number;
  session: Session | null;
};

export default function ProductList({
  products,
  totalPages,
  currentPage,
  session,
}: ProductListProps) {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 my-6 gap-8   ">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} session={session} />
        ))}
      </div>
      <div className="my-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
