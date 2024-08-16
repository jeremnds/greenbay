import { OrderType } from "@/src/models/order.type";
import Link from "next/link";
import { Button, buttonVariants } from "../atoms/Button";

type OrderRowProps = {
  order: OrderType;
  index: number;
};

export default function OrderRow({ order, index }: OrderRowProps) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  dark:text-gray-500">
        #{index + 1}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
        ${order.total_price}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
        <Button className="capitalize hover:bg-primary">{order.status}</Button>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`/order-summary?order_id=${order.id}`}
        >
          View Order
        </Link>
      </td>
    </tr>
  );
}
