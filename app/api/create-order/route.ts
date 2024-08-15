import { OrderType } from "@/src/models/order.type";
import { createOrder } from "@/src/queries/createOrder.query";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { totalPrice, cart, customerId } = await request.json();

    if (!totalPrice || !cart || !customerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder: OrderType = {
      user_id: customerId,
      total_price: totalPrice,
      status: "pending",
      order_items: cart,
    };

    const order = await createOrder(newOrder);

    if (!order) {
      return NextResponse.json(
        { error: "Order creation failed" },
        { status: 500 }
      );
    }
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
