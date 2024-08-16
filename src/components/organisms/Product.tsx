"use client";

import { cn } from "@/src/lib/utils";
import { CategoryType } from "@/src/models/category.type";
import { ProductType } from "@/src/models/product.type";
import { Session } from "next-auth";
import BackButton from "../atoms/BackButton";
import { buttonVariants } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";
import ProductAddQuantity from "../molecules/ProductAddQuantity";

type ProductPageProps = {
  product: ProductType;
  session: Session | null;
  category: CategoryType;
};

export default function Product({
  product,
  session,
  category,
}: ProductPageProps) {
  return (
    <>
      <BackButton />
      <div className="flex flex-col items-center gap-4 mt-4">
        <ItemImage item={product} className="w-60" />
        <div className="flex flex-col gap-10">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <span>${product.price}</span>
          </div>
          <div>
            {product.description} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Adipisci voluptates quisquam omnis itaque quis!
            Nobis optio eum ab enim, tempora sit, rerum iure mollitia repellat
            deleniti nisi blanditiis ut. Ad.
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <h4>Category</h4>
              <p className={cn(buttonVariants())}>{category.name}</p>
            </div>
            <ProductAddQuantity session={session} product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
