import { supabaseServer } from "../lib/supabaseServer";
import { OrderType } from "../models/order.type";

type OrderPromise = {
  orders: OrderType[];
  error: Error | null;
};

export async function getOrdersByUserId(
  id: string | null
): Promise<OrderPromise> {
  const { data: orders, error } = await supabaseServer
    .from("orders")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be loaded");
  }

  return { orders, error };
}
