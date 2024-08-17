import { CategoriesType } from "@/src/models/categories.type";
import { OnUploadImageType } from "@/src/models/onUploadImage.type";
import { ProductType } from "@/src/models/product.type";
import { ProductFormData } from "@/src/models/productFormData.type";
import { ProductSchema } from "@/src/schemas/ProductSchema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import Spinner from "../atoms/Spinner";
import { Textarea } from "../atoms/Textarea";
import DeleteItemModal from "../molecules/DeleteItemModal";
import FormField from "../molecules/FormField";
import UploadImage from "../molecules/UploadImage";

type ProductFormProps = {
  onFnClient: (data: ProductFormData) => void;
  btnLabel: string;
  product?: ProductType;
  categories: CategoriesType;
  onUploadImage: OnUploadImageType;
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
    reValidateMode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onFnClient)}>
      <div className="grid gap-2">
        <FormField
          error={errors.productName}
          inputName="productName"
          labelText="Name"
        >
          <Input
            type="text"
            {...register("productName")}
            name="productName"
            id="productName"
          />
        </FormField>
        <FormField
          error={errors.description}
          inputName="description"
          labelText="Description"
        >
          <Textarea
            {...register("description")}
            name="description"
            id="description"
          />
        </FormField>

        <div className="flex gap-8">
          <FormField
            error={errors.category}
            inputName="category"
            labelText="Category"
          >
            <div>
              <select
                {...register("category")}
                name="category"
                id="category"
                className=" w-full border-input rounded-lg border bg-white dark:bg-black px-2 py-2.5 sm:text-sm  focus:outline-none focus:ring-2 ring-primary ring-offset-1"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </FormField>

          <FormField error={errors.price} inputName="price" labelText="Price">
            <Input
              type="number"
              {...register("price")}
              name="price"
              id="price"
              step="any"
            />
          </FormField>
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
          id="available"
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
