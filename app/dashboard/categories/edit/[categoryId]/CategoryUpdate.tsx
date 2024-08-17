"use client";

import { deleteCategoryAction, updateCategoryAction } from "@/src/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import ItemImage from "../../../../../src/components/atoms/ItemImage";
import CategoryForm from "../../../../../src/components/organisms/CategoryForm";
import { CategoryType } from "../../../../../src/models/category.type";
import { CategoryFormData } from "../../../../../src/models/categoryFormData.type";

type UpdateCategoryProps = {
  category: CategoryType;
};

export default function CategoryUpdate({ category }: UpdateCategoryProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const deleteCategoryClient = async () => {
    await deleteCategoryAction(category.id);
    toast.success(`Category ${category.id} succesfully deleted`, {
      position: "bottom-right",
    });
  };

  const updateCategoryClient = async (data: CategoryFormData) => {
    const formData = new FormData();

    formData.append("name", data.categoryName);

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }
    await updateCategoryAction(formData, category.id);
    toast.success(`Category ${category.id} succesfully edited`, {
      position: "bottom-right",
    });
  };

  return (
    <div className="grid   xl:grid-cols-[20rem_1fr] w-full  items-center  gap-6 lg:gap-8">
      <ItemImage item={category} className="max-w-sm" />
      <CategoryForm
        onFnClient={updateCategoryClient}
        onUploadImage={setUploadedImage}
        btnLabel="Edit"
        category={category}
        onDeleteClient={deleteCategoryClient}
      />
    </div>
  );
}
