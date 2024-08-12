import { supabase } from "@/src/lib/supabase";
import { CategoriesType } from "../models/categories.type";

export async function getCategories(): Promise<{
  categories: CategoriesType;
  count?: number;
}> {
  const {
    data: categories,
    count,
    error,
  } = await supabase.from("categories").select("id,name", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return { categories, count: count ?? 0 };
}
