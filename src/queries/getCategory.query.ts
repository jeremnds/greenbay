import { supabaseServer } from "../lib/supabaseServer";
import { CategoryType } from "../models/category.type";

export async function getCategory(id: number): Promise<CategoryType> {
  const { data: category, error } = await supabaseServer
    .from("categories")
    .select("name, image, id")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be loaded");
  }

  return category;
}
