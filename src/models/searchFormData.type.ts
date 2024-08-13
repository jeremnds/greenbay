import { z } from "zod";
import { SearchSchema } from "../schemas/SearchSchema.schema";

export type SearchFormData = z.infer<typeof SearchSchema>;
