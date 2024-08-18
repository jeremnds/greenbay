import { buttonVariants } from "@/src/components/atoms/Button";
import { cn } from "@/src/lib/utils";
import { getProducts } from "@/src/queries/getProducts.query";
import Link from "next/link";
import ItemImage from "../atoms/ItemImage";

export default async function ProductsSection() {
  const { products } = await getProducts();

  return (
    <section className="mt-20 grid grid-rows-2 grid-cols-2 md:grid-cols-2  lg:grid-rows-1 lg:grid-cols-4 lg:gap-6 gap-4 ">
      <div className="flex flex-col gap-6  w-52 justify-center lg:justify-normal">
        <h3 className="font-medium text-2xl w-36">Best Selling Plants</h3>
        <p className="text-sm lg:text-lg">
          Easiest way to healthy life by buying your favorite plants{" "}
        </p>
        <Link
          href="/products"
          className={cn(buttonVariants(), "w-3/4 lg:w-full")}
        >
          See more &rarr;
        </Link>
      </div>

      {products.slice(0, 3).map((product) => (
        <Link
          href={`/products/${product.id}`}
          className="flex flex-col gap-1 group"
          key={product.id}
        >
          <ItemImage
            item={product}
            className="xs:h-52 sm:h-60 lg:h-96 md:h-72"
          />
          <p className="group-hover:text-green-600">{product.name}</p>
          <span>${product.price}</span>
        </Link>
      ))}
    </section>
  );
}
