import { ProductSchema } from "@/app/_models/schemas";
import {
  CategoriesType,
  ProductFormData,
  ProductType,
} from "@/app/_models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DeleteItemModal from "./DeleteItemModal";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import { Textarea } from "./shadcn/textarea";
import Spinner from "./Spinner";
import UploadImage from "./UploadImage";

type ProductFormProps = {
  onFnClient: (data: ProductFormData) => void;
  btnLabel: string;
  product?: ProductType;
  categories: CategoriesType;
  onUploadImage: (value: File | null) => void;
  onDeleteClient?: () => void;
};

export default function ProductForm({
  onFnClient,
  btnLabel,
  product,
  categories,
  onUploadImage,
  onDeleteClient,
}: ProductFormProps) {
  const productCategory = categories.filter(
    (category) => category.id === product?.category_id
  );

  const productCategoryId = productCategory.length ? productCategory[0].id : 1;

  const defaultValues = {
    productName: product?.name || "",
    description: product?.description || "",
    available: product?.available || false,
    category: productCategoryId,
    price: product?.price || 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onFnClient)}>
      <div className="grid gap-2">
        <div>
          <Label htmlFor="productName">Name</Label>
          <Input
            {...register("productName")}
            type="text"
            id="productName"
            name="productName"
          />
          {errors.productName?.message && (
            <span className="text-red-700 text-sm">
              {errors.productName?.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            id="description"
            name="description"
          />
          {errors.description?.message && (
            <span className="text-red-700 text-sm">
              {errors.description?.message}
            </span>
          )}
        </div>
        <div className="flex gap-8">
          <div>
            <Label htmlFor="category">Category</Label>

            <div>
              <select
                {...register("category")}
                name="category"
                id="category"
                className=" w-full border-input rounded-lg border bg-white px-2 py-2.5 sm:text-sm  focus:outline-none focus:ring-2 ring-primary ring-offset-1"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category?.message && (
                <span className="text-red-700 text-sm">
                  {errors.category?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              {...register("price")}
              type="number"
              id="price"
              name="price"
              step="any"
            />
            {errors.price?.message && (
              <span className="text-red-700 text-sm">
                {errors.price?.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label>Upload an image</Label>
          <UploadImage onUploadImage={onUploadImage} />
        </div>
      </div>
      <div className="flex gap-4 lg:col-span-2 items-center mt-4">
        <input
          type="checkbox"
          className="size-4 rounded border-input accent-primary"
          id="Option1"
          {...register("available")}
        />
        <Label>Available</Label>

        <div className="ml-auto flex gap-3 ">
          {isSubmitting ? (
            <Button type="submit" disabled>
              <Spinner />
            </Button>
          ) : (
            <Button type="submit">{btnLabel}</Button>
          )}
          {onDeleteClient && (
            <DeleteItemModal onDeleteClient={onDeleteClient} />
          )}
        </div>
      </div>
    </form>
  );
}
