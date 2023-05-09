import { addPayment } from "@/app/actions/getReservations";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
  timeout: 100000,
});

interface IParams {
  id: string;
  reservationId: string;
}

const GET = async (req: Request, { params }: { params: IParams }) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      params.id as string,
      {
        expand: ["payment_intent", "line_items.data.price.product"],
      }
    );
    console.log(session);
    return NextResponse.json(session);
  } catch (e) {
    console.log(e);
  }
};
const POST = async (req: Request, res: Response) => {
  const { reservationId, receiptNumber } = await req.json();
  try {
    const session = await addPayment({ reservationId, receiptNumber });
    return NextResponse.json({ session, receiptNumber });
  } catch (e) {
    console.log(e);
  }
};

export { GET, POST };
