import { supabaseClient } from "../lib/supabaseClient";

export async function getProductClient(id: number): Promise<{ name: string }> {
  const { data: product, error } = await supabaseClient
    .from("products")
    .select("name")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product name could not be loaded");
  }

  return product;
}
