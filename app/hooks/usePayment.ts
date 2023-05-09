import crypto from "crypto";
import { SafeReservation } from "../types";
import { getPaymentUrl } from "../service/paymentService";
import { loadStripe } from "@stripe/stripe-js";
if (!process.env.NEXT_PUBLIC_STRIPE_KEY)
  throw new Error("No Strip Public Key Present");

const usePayment = () => {
  const generateReceipt = () => {
    return `${crypto.randomBytes(6).toString("hex")}-${new Date().getMinutes}`;
  };
  const redirectToPayment = async (reservation: SafeReservation) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    const payment = {
      reservationId: reservation.id,
      price: reservation!.totalPrice,
      unit: 1,
      propertyName: reservation!.listing.title,
    };
    const { session } = await getPaymentUrl(payment).then((res) => res.data);
    console.log(session);
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return { redirectToPayment, generateReceipt };
};

export default usePayment;
