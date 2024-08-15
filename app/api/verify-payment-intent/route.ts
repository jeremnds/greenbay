import { verifyPaymentIntent } from "@/src/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const paymentIntentId = request.nextUrl.searchParams.get("payment_intent");

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "Missing payment intent" },
      { status: 400 }
    );
  }

  const isValid = await verifyPaymentIntent(paymentIntentId);

  if (isValid) {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ valid: false });
  }
}
