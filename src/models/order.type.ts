import { UUID } from "crypto";
import { OrderItemType } from "./orderItem.type";

export type OrderType = {
  id?: UUID;
  user_id: number;
  total_price: number;
  status: "pending" | "complete";
  order_items: OrderItemType[];
};
