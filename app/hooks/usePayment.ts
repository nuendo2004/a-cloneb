import crypto from "crypto";
import { loadStripe } from "@stripe/stripe-js";
import { SafeReservation } from "../types";
import { getPaymentUrl } from "../service/paymentService";

const usePayment = () => {
  const generateReceipt = () => {
    return `${crypto.randomBytes(6).toString("hex")}-${new Date().getMinutes}`;
  };
  const redirectToPayment = async (reservation: SafeReservation) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

    const payment = {
      price: reservation!.listing.price,
      propertyName: reservation!.listing.title,
    };
    const { sessionId } = await getPaymentUrl(payment).then((res) => res.data);
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });
  };

  return { redirectToPayment };
};

export default usePayment;
