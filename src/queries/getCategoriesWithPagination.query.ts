import { supabaseServer } from "../lib/supabaseServer";
import { CategoriesWithPaginationType } from "../models/categoriesWithPagination.type";

export async function getCategoriesWithPagination(
  page: number,
  limit: number,
  searchQuery: string
): Promise<CategoriesWithPaginationType> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  let query = supabaseServer
    .from("categories")
    .select("id, name, image", {
      count: "exact",
    })
    .order("id", { ascending: false })
    .range(startIndex, endIndex);

  if (searchQuery) query = query.ilike("name", `%${searchQuery}%`);

  const { data: categories, count, error } = await query;

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
