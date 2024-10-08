"use client";

import { createProductAction } from "@/src/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "../../../../src/components/organisms/ProductForm";
import { CategoriesType } from "../../../../src/models/categories.type";
import { ProductFormData } from "../../../../src/models/productFormData.type";

type CreateProductProps = {
  categories: CategoriesType;
};

export default function ProductCreate({ categories }: CreateProductProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const createProductClient = async (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("category_id", String(data.category));
    formData.append("available", String(data.available));

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    await createProductAction(formData);
    toast.success(`Product succesfully created`, {
      position: "bottom-right",
    });
  };

  return (
    <div className="grid max-w-full  items-center  gap-3 lg:gap-2">
      <ProductForm
        onFnClient={createProductClient}
        btnLabel="Add"
        categories={categories}
        onUploadImage={setUploadedImage}
      />
    </div>
  );
}
