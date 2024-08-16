"use client";

import BackButton from "@/src/components/atoms/BackButton";
import { Button } from "@/src/components/atoms/Button";
import ItemImage from "@/src/components/atoms/ItemImage";
import PageContainer from "@/src/components/atoms/PageContainer";
import Spinner from "@/src/components/atoms/Spinner";
import { OrderType } from "@/src/models/order.type";
import { getOrderClient } from "@/src/queries/getOrderClient.query";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { useCartStore } from "@/src/store/cartStore";
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
  const first = searchParams.get("first");
  const router = useRouter();
  const { clearCart } = useCartStore();

  if (!orderId) router.push("/");

  useEffect(() => {
    async function fetchOrder() {
      try {
        if (orderId) {
          const { order, error } = await getOrderClient(orderId);
          if (error) throw error;

          if (customerId !== order?.user_id) {
            throw new Error("Unauthorized access");
          }

          const updatedOrderItems = await Promise.all(
            order.order_items.map(async (item) => {
              try {
                const product = await getProductClient(item.product_id);
                return { ...item, name: product.name, image: product.image };
              } catch (error) {
                console.error("Failed to fetch product name:", error);
                return item;
              }
            })
          );

          setOrder({ ...order, order_items: updatedOrderItems });
          setLoadingItems(false);
        }
      } catch (err) {
        router.push("/");
        setLoadingItems(false);
      }
    }

    fetchOrder();

    if (first !== null) {
      clearCart();
    }
  }, [orderId, customerId, router, first]);

  if (!order || loadingItems)
    return <Spinner className="h-[calc(100vh-25rem)]" />;

  return (
    <PageContainer className="mt-8">
      <div className="flex justify-between items-center w-full mb-8 relative">
        <BackButton className="" />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-green-800 font-semibold    text-xl md:text-2xl">
          Order Summary
        </h1>
      </div>

      <div className="flex flex-col gap-4 ">
        {order.order_items.map((item) => (
          <Link href={`products/${item.product_id}`} key={item.product_id}>
            <li className="flex items-center gap-4  hover:bg-gray-100 dark:hover:bg-gray-800">
              <ItemImage
                item={item}
                className="h-16 w-16"
                placeholderText={false}
              />

              <div>
                <h3 className="text-sm text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-400">
                  <div className="flex flex-col">
                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline">${item.price}</dd>
                    </div>
                    <div>
                      <dt className="inline">Quantity: </dt>
                      <dd className="inline">{item.quantity}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </li>
          </Link>
        ))}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-">Total Price: </p>
            <p className="text-sm">${order.total_price}</p>
          </div>

          <Button className="capitalize hover:bg-primary">
            {order.status}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
