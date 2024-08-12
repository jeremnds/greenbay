import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { Label } from "../atoms/shadcn/label";

type FormFieldProps = {
  inputName:
    | "categoryName"
    | "productName"
    | "description"
    | "price"
    | "category";
  error: FieldError | undefined;
  labelText: string;
  children: ReactNode;
};

export default function FormField({
  inputName,
  error,
  labelText,
  children,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={inputName}>{labelText}</Label>
      {children}
      {error && <span className="text-red-700 text-sm">{error.message}</span>}
    </div>
  );
}
