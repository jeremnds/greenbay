"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { updateProductAction } from "../_lib/actions";
import { CategoriesType, ProductType } from "../_models/types";
import { Button } from "./ui/shadcn/button";
import { Input } from "./ui/shadcn/input";
import { Label } from "./ui/shadcn/label";
import { Textarea } from "./ui/shadcn/textarea";
import Spinner from "./ui/Spinner";
import UploadImage from "./ui/UploadImage";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

type ProductFormData = z.infer<typeof ProductSchema>;
const ProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, "Product name is required.")
    .max(100, '"Product name must not exceed 100 chars'),
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(200, "Description must not exceed 200 chars"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  category: z.coerce.number(),
  image: z.instanceof(File).optional(),
  available: z.boolean(),
});

export default function ProductForm({ product, categories }: ProductFormProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const productCategory = categories.filter(
    (category) => category.id === product.category_id
  );

  const productCategoryId = productCategory.length && productCategory[0].id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: product.name,
      description: product.description,
      category: productCategoryId,
      available: product.available,
      price: product.price,
    },
  });

  const updateProductClient = async (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("category_id", String(data.category));
    formData.append("available", String(data.available));

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    await updateProductAction(formData, product.id);
    toast.success(`Product ${product.id} succesfully edited`, {
      position: "bottom-right",
    });
  };

  return (
    <form onSubmit={handleSubmit(updateProductClient)}>
      <div className="grid  max-w-sm md:max-w-max xl:grid-cols-[20rem_1fr] w-full  items-center  gap-3 lg:gap-2">
        {product.image ? (
          <div className="relative h-72 w-60  ">
            <Image
              src={product.image}
              alt={`Image of ${product.name}`}
              priority
              fill
              className="object-cover object-bottom"
            />
          </div>
        ) : (
          <div className="h-72 w-60 bg-gray-200 font-bold flex items-center justify-center">
            <p>NO IMAGE YET</p>
          </div>
        )}
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
            <UploadImage onUploadImage={setUploadedImage} />
          </div>
        </div>
        <div className="flex gap-4 lg:col-span-2 items-center ">
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
              <Button type="submit">Edit</Button>
            )}
            <Button variant="destructive" type="button">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
