"use client";

import Spinner from "@/src/components/atoms/Spinner";
import { OrderType } from "@/src/models/order.type";
import { getOrderClient } from "@/src/queries/getOrderClient.query";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const customerId = session?.user?.customerId;
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loadingItems, setLoadingItems] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      const { order, error } = await getOrderClient(orderId);
      if (error) {
        console.error("Failed to fetch order:", error);
        return;
      }

      if (customerId !== order?.user_id) {
        router.push("/");
        return;
      }

      const updatedOrderItems = await Promise.all(
        order.order_items.map(async (item) => {
          try {
            const product = await getProductClient(item.product_id);
            return { ...item, name: product.name };
          } catch (error) {
            console.error("Failed to fetch product name:", error);
            return item;
          }
        })
      );

      setOrder({ ...order, order_items: updatedOrderItems });
      setLoadingItems(false);
    }

    fetchOrder();
  }, [orderId, customerId, router]);

  if (!order || loadingItems) return <Spinner />;

  return (
    <>
      <div>
        <h1>Order Summary</h1>
        <p>Order ID: {order.id}</p>
        <p>Total Price: ${order.total_price}</p>
        <p>Status: {order.status}</p>
        <div>
          <h2>Items</h2>
          {order.order_items.map((item) => (
            <Link
              href={`products/${item.product_id}`}
              key={item.product_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
