import { cn } from "@/src/lib/utils";
import { ProductProps } from "@/src/models/productProps.type";
import { getCategory } from "@/src/queries/getCategory.query";
import { Button, buttonVariants } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";
import NumberField from "../molecules/NumberField";

export default async function Product({ product }: ProductProps) {
  const category = await getCategory(product.category_id);
  return (
    <div className="flex flex-col items-center gap-4">
      <ItemImage item={product} className="" />
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
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <NumberField />
            <Button
              className="rounded-full border border-input hover:bg-green-900/95 hover:text-white px-8 uppercase "
              variant="ghost"
            >
              Add to card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
