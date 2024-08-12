import { supabase } from "@/src/lib/supabase";
import { ProductsType } from "../models/products.type";

export async function getProducts(): Promise<{
  products: ProductsType;
  count?: number;
}> {
  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("id, name, description, price, image, category_id, available", {
      count: "exact",
    })
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return { products, count: count ?? 0 };
}
