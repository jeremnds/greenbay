"use client";

import { supabaseClient } from "@/src/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [order, setOrder] = useState(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
      } else {
        setOrder(data);
      }
    }

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Order ID: {order.id}</p>
      <p>Total Price: ${order.total_price}</p>
      <p>Status: {order.status}</p>
      <div>
        <h2>Items</h2>
        {order.order_items.map((item) => (
          <div key={item.product_id}>
            <p>
              {item.name} - ${item.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
