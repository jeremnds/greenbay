import { z } from "zod";

export const CategorySchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(30, "Category name must not exceed 30 chars"),
  image: z.instanceof(File).optional(),
});
