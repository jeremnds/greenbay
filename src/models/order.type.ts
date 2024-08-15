import { CartItemType } from "./cartItem.type";

export type OrderType = {
  user_id: number;
  total_price: number;
  status: "pending" | "complete";
  order_items: CartItemType[];
};
