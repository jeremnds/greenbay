import { supabase } from "@/src/lib/supabase";
import { ProductType } from "../models/product.type";

export async function getProduct(id: number): Promise<ProductType> {
  const { data: product, error } = await supabase
    .from("products")
    .select("name, image, id, description, price, category_id, available")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return product;
}
