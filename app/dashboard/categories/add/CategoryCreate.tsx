"use client";

import { createCategoryAction } from "@/src/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "../../../../src/components/organisms/CategoryForm";
import { CategoryFormData } from "../../../../src/models/categoryFormData.type";

export default function CategoryCreate() {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const createCategoryClient = async (data: CategoryFormData) => {
    const formData = new FormData();

    formData.append("name", data.categoryName);

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    await createCategoryAction(formData);
    toast.success(`Product succesfully created`, {
      position: "bottom-right",
    });
  };

  return (
    <CategoryForm
      btnLabel="Add"
      onUploadImage={setUploadedImage}
      onFnClient={createCategoryClient}
    />
  );
}
