import { z } from "zod";

export const ProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, "Product name is required.")
    .max(100, '"Product name must not exceed 100 chars'),
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(200, "Description must not exceed 200 chars"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  category: z.coerce.number(),
  image: z.instanceof(File).optional(),
  available: z.boolean(),
});
