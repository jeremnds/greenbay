"use client";

import { deleteProductAction, updateProductAction } from "@/src/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import ItemImage from "../../../../../src/components/atoms/ItemImage";
import ProductForm from "../../../../../src/components/organisms/ProductForm";
import { CategoriesType } from "../../../../../src/models/categories.type";
import { ProductType } from "../../../../../src/models/product.type";
import { ProductFormData } from "../../../../../src/models/productFormData.type";

type ProductFormProps = {
  product: ProductType;
  categories: CategoriesType;
};

export default function ProductUpdate({
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
    <div className="grid xl:grid-cols-[20rem_1fr] w-full items-center gap-6 lg:gap-8">
      <ItemImage className="max-w-sm" item={product} />
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
