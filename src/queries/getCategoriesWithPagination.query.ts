import { supabase } from "@/src/lib/supabase";
import { CategoriesWithPaginationType } from "../models/categoriesWithPagination.type";

export async function getCategoriesWithPagination(
  page: number,
  limit: number
): Promise<CategoriesWithPaginationType> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const {
    data: categories,
    count,
    error,
  } = await supabase
    .from("categories")
    .select("id, name, image", {
      count: "exact",
    })
    .order("id", { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  let totalPages;
  if (count) totalPages = Math.ceil(count / limit);

  return {
    categories,
    count: count ?? 0,
    totalPages: totalPages ?? 1,
  };
}
