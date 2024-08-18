import { cn } from "@/src/lib/utils";
import { getCategories } from "@/src/queries/getCategories.query";
import Link from "next/link";
import { buttonVariants } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";

export default async function CategoriesSection() {
  const { categories } = await getCategories();

  return (
    <section className="mt-20 flex flex-col items-center  gap-3 ">
      <h3 className="font-bold text-2xl">Categories</h3>
      <p className="text-gray-700 dark:text-gray-200">
        Find what you are looking for
      </p>
      <div className="mt-5 pb-5 lg:pb-0 bg-slate-500 h-full lg:h-96 w-full rounded-xl flex justify-center lg:items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 lg:gap-8">
          {categories.slice(0, 3).map((category) => (
            <div className="pt-12 lg:pt-0" key={category.id}>
              <ItemImage item={category} className="w-52 h-52" />
              <p className="pt-2 text-white">{category.name}</p>
            </div>
          ))}

          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "text-center lg:col-start-2 mt-2 lg:mt-0"
            )}
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
