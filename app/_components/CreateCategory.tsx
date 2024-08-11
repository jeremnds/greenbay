"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createCategoryAction } from "../_lib/actions";
import { CategoryFormData } from "../_models/types";
import CategoryForm from "./ui/CategoryForm";

export default function CreateCategory() {
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
