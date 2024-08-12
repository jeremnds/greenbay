import { z } from "zod";
import { CategorySchema } from "../schemas/CategorySchema.zod";

export type CategoryFormData = z.infer<typeof CategorySchema>;
