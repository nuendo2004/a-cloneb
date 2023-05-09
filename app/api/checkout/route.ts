import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
  timeout: 100000,
});
const POST = async (req: Request) => {
  const {
    reservationId,
    price,
    unit,
    propertyName,
  }: {
    propertyName: string;
    reservationId: string;
    price: number;
    unit: number;
  } = await req.json();
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/checkout?session_id={CHECKOUT_SESSION_ID}&reservationId=${reservationId}`,
      cancel_url: `${req.headers.get("origin")}/`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: propertyName,
            },
            unit_amount: price,
          },
          quantity: unit,
        },
      ],
    });
  } catch (e: any) {
    // console.log(e);
    throw new Error("PaymentFailed", e);
  }
  return NextResponse.json({ session });
};

export { POST };
