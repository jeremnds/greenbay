import { cn } from "@/src/lib/utils";
import { ProductProps } from "@/src/models/productProps.type";
import Link from "next/link";
import { buttonVariants } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="relative hover:scale-105 transition-all group">
      <Link href={`/products/${product.id}`}>
        <ItemImage item={product} className="w-full " />
        <div className="flex items-center justify-between w-full">
          <p className="group-hover:text-primary">{product.name}</p>
          <span className="text-green-900">${product.price}</span>
        </div>
      </Link>
      <Link
        href="/cart"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full border border-input hover:bg-green-900/95 hover:text-white px-8 uppercase bottom-0 absolute bg-white left-1/2 transform -translate-x-1/2 transition-all duration-300 hidden  group-hover:animate-showup group-hover:block group-hover:bottom-8 animate-hide"
        )}
      >
        Add to cart
      </Link>
    </div>
  );
}
