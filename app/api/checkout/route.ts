import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
  timeout: 100000,
});
console.log(stripe);
const POST = async (req: Request) => {
  const {
    propertyName,
    price,
  }: { propertyName: string; dates: number; price: number } = await req.json();
  let sessions;
  try {
    sessions = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: propertyName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
    });
  } catch (e: any) {
    console.log(e);
    throw new Error("PaymentFailed", e);
  }

  return NextResponse.json({ sessionId: sessions.id });
};

export { POST };
