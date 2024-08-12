import { z } from "zod";
import { ProductSchema } from "../schemas/ProductSchema.zod";

export type ProductFormData = z.infer<typeof ProductSchema>;
