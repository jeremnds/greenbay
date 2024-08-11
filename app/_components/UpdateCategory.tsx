"use client";

import { useState } from "react";
import { CategoryType } from "../_models/types";
import CategoryForm from "./ui/CategoryForm";
import ItemImage from "./ui/ItemImage";

type UpdateCategoryProps = {
  category: CategoryType;
};

export default function UpdateCategory({ category }: UpdateCategoryProps) {
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  return (
    <div className="grid  max-w-sm md:max-w-max xl:grid-cols-[20rem_1fr] w-full  items-center  gap-3 lg:gap-2">
      <ItemImage item={category} />
      <CategoryForm
        onUploadImage={setUploadedImage}
        btnLabel="Edit"
        category={category}
        // onDeleteClient={}
      />
    </div>
  );
}
