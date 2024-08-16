import { supabaseServer } from "../lib/supabaseServer";
import { OrderType } from "../models/order.type";

type OrderPromise = {
  id: number;
};

export async function createOrder(newOrder: OrderType): Promise<OrderPromise> {
  const { data: order, error } = await supabaseServer
    .from("orders")
    .insert([newOrder])
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order could not be created");
  }
  return order;
}
