import { CategoriesType, ProductType } from "../_models/types";
import { Input } from "./ui/shadcn/input";
import { Label } from "./ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/shadcn/select";
import { Textarea } from "./ui/shadcn/textarea";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

export default function ProductForm({ product, categories }: ProductFormProps) {
  const productCategory = categories.filter(
    (category) => category.id === product.category_id
  );
  const categoryName =
    productCategory.length > 0 ? productCategory[0].name : undefined;

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

        <div className="flex gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={categoryName} name="category">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              defaultValue={product.price}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
