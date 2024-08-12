"use client";

import { deleteCategoryAction, updateCategoryAction } from "@/src/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "./ui/CategoryForm";
import ItemImage from "./ui/ItemImage";
import { CategoryType } from "../models/category.type";
import { CategoryFormData } from "../models/categoryFormData.type";

type UpdateCategoryProps = {
  category: CategoryType;
};

export default function UpdateCategory({ category }: UpdateCategoryProps) {
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
    <div className="grid  max-w-sm md:max-w-max xl:grid-cols-[20rem_1fr] w-full  items-center  gap-3 lg:gap-2">
      <ItemImage item={category} />
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
