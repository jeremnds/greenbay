import { supabase } from "@/src/lib/supabase";
import { ProductsWithPaginationType } from "../models/productWithPagination.type";

export async function getProductsWithPagination(
  page: number,
  limit: number
): Promise<ProductsWithPaginationType> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const {
    data: products,
    count,
    error,
  } = await supabase
    .from("products")
    .select("id, name, description, price, image, category_id, available", {
      count: "exact",
    })
    .order("id", { ascending: false })
    .range(startIndex, endIndex);

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
