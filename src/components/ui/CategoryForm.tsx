import { CategorySchema } from "@/src/schemas/CategorySchema.zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DeleteItemModal from "./DeleteItemModal";
import FormField from "./FormField";
import { Button } from "./shadcn/button";
import Spinner from "./Spinner";
import UploadImage from "./UploadImage";
import { CategoryType } from "@/src/models/category.type";
import { OnUploadImageType } from "@/src/models/onUploadImage.type";
import { CategoryFormData } from "@/src/models/categoryFormData.type";

type CategoryFormProps = {
  category?: CategoryType;
  btnLabel: string;
  onUploadImage: OnUploadImageType;
  onFnClient: (data: CategoryFormData) => void;
  onDeleteClient?: () => void;
};

export default function CategoryForm({
  category,
  btnLabel,
  onUploadImage,
  onFnClient,
  onDeleteClient,
}: CategoryFormProps) {
  const defaultValues = {
    categoryName: category?.name || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onFnClient)} className="flex flex-col gap-3">
      <FormField<CategoryFormData>
        error={errors.categoryName}
        inputName="categoryName"
        register={register}
        labelText="Name"
      />
      <UploadImage onUploadImage={onUploadImage} />

      <div className="ml-auto flex gap-3 ">
        {isSubmitting ? (
          <Button type="submit" disabled>
            <Spinner />
          </Button>
        ) : (
          <Button type="submit">{btnLabel}</Button>
        )}
        {onDeleteClient && <DeleteItemModal onDeleteClient={onDeleteClient} />}
      </div>
    </form>
  );
}
