import { supabaseClient } from "../lib/supabaseClient";
import { OrderType } from "../models/order.type";

type OrderClientPromise = {
  order: OrderType;
  error: Error | null;
};

export async function getOrderClient(
  id: string | null
): Promise<OrderClientPromise> {
  const { data: order, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order could not be loaded");
  }

  return { order, error };
}
