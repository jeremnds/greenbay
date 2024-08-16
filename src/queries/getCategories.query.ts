import { supabaseServer } from "../lib/supabaseServer";
import { CategoriesType } from "../models/categories.type";

export async function getCategories(): Promise<{
  categories: CategoriesType;
  count?: number;
}> {
  const {
    data: categories,
    count,
    error,
  } = await supabaseServer
    .from("categories")
    .select("id,name, image", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return { categories, count: count ?? 0 };
}
