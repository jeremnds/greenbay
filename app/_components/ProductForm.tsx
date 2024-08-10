import { CategoriesType, ProductType } from "../_models/types";
import { Input } from "./ui/shadcn/input";
import { Label } from "./ui/shadcn/label";
import { Textarea } from "./ui/shadcn/textarea";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

export default function ProductForm({ product, categories }: ProductFormProps) {
  return (
    <form action="">
      <div className="grid  w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="productName">Name</Label>
        <Input
          type="text"
          id="productName"
          name="productName"
          defaultValue={product.name}
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product.description}
        />
      </div>
    </form>
  );
}
