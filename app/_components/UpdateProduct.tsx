"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { updateProductAction } from "../_lib/actions";
import { CategoriesType, ProductType } from "../_models/types";
import ProductForm, { ProductSchema } from "./ui/ProductForm";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

export type ProductFormData = z.infer<typeof ProductSchema>;

export default function UpdateProduct({
  product,
  categories,
}: ProductFormProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

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
      <ProductForm
        onFnClient={updateProductClient}
        btnLabel="Edit"
        product={product}
        categories={categories}
        onUploadImage={setUploadedImage}
      />
    </div>
  );
}
