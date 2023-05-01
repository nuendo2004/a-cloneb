import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
  timeout: 100000,
});

interface IParams {
  id: string;
}

const GET = async (req: Request, { params }: { params: IParams }) => {
  const session = await stripe.checkout.sessions.retrieve(params.id as string);
  return NextResponse.json(session);
};

export { GET };
