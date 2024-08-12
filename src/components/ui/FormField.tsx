import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import { Textarea } from "./shadcn/textarea";

type FormFieldProps<FormData extends FieldValues> = {
  inputName: Path<FormData>;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  type?: "text" | "number";
  labelText: string;
  fieldType?: "input" | "textarea";
  step?: "any";
};

export default function FormField<FormData extends FieldValues>({
  inputName,
  register,
  error,
  fieldType = "input",
  labelText,
  type = "text",
  step,
  ...props
}: FormFieldProps<FormData>) {
  return (
    <div>
      <Label htmlFor={inputName}>{labelText}</Label>
      {fieldType === "textarea" ? (
        <Textarea {...register(inputName)} id={inputName} name={inputName} />
      ) : (
        <Input
          {...register(inputName)}
          type={type}
          id={inputName as string}
          name={inputName as string}
          step={step}
        />
      )}
      {error && <span className="text-red-700 text-sm">{error.message}</span>}
    </div>
  );
}
