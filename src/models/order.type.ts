import { UUID } from "crypto";
import { CartItemType } from "./cartItem.type";

export type OrderType = {
  id?: UUID;
  user_id: number;
  total_price: number;
  status: "pending" | "complete";
  order_items: CartItemType[];
};
