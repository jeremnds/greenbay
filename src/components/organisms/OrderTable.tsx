import { OrderType } from "@/src/models/order.type";
import OrderRow from "../molecules/OrderRow";

type OrderTableProps = {
  orders: OrderType[];
};

export default async function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:bg-stone-950 dark:divide-stone-700 text-center">
        <thead className="">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Order
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Total
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Status
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-stone-700">
          {orders.map((order, index) => (
            <OrderRow order={order} index={index} key={order.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
