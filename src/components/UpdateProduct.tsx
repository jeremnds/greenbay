"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProductAction, updateProductAction } from "../lib/actions";
import { CategoriesType, ProductFormData, ProductType } from "../models/types";
import ItemImage from "./ui/ItemImage";
import ProductForm from "./ui/ProductForm";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

export default function UpdateProduct({
  product,
  categories,
}: ProductFormProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const deleteProductClient = async () => {
    await deleteProductAction(product.id);
    toast.success(`Product ${product.id} succesfully deleted`, {
      position: "bottom-right",
    });
  };

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
      <ItemImage item={product} />
      <ProductForm
        onFnClient={updateProductClient}
        btnLabel="Edit"
        product={product}
        categories={categories}
        onUploadImage={setUploadedImage}
        onDeleteClient={deleteProductClient}
      />
    </div>
  );
}
