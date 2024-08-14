import { supabaseServer } from "../lib/supabaseServer";
import { ProductsWithPaginationType } from "../models/productWithPagination.type";

export async function getProductsWithPagination(
  page: number,
  limit: number,
  searchQuery?: string
): Promise<ProductsWithPaginationType> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  let query = supabaseServer
    .from("products")
    .select("id, name, description, price, image, category_id, available", {
      count: "exact",
    })
    .order("id", { ascending: false })
    .range(startIndex, endIndex);

  if (searchQuery) query = query.ilike("name", `%${searchQuery}%`);

  const { data: products, count, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  let totalPages;
  if (count) totalPages = Math.ceil(count / limit);

  return {
    products,
    count: count ?? 0,
    totalPages: totalPages ?? 1,
  };
}
