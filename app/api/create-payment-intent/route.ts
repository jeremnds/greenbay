import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const { total } = await request.json();
    console.log("Total Amount:", total); // Add this to check the amount
    if (!total) throw new Error("Amount is missing!");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
