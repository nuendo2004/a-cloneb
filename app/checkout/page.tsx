"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCheckOut, getPaymentUrl } from "@/app/service/paymentService";
import { useSearchParams } from "next/navigation";
import usePayment from "../hooks/usePayment";
import { AiFillCheckCircle } from "react-icons/ai";
import Button from "../components/Button";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams!.get("session_id");
  const reservationId = searchParams!.get("reservationId");
  const payment = usePayment();
  const {
    data: sessionData,
    error,
    isLoading,
  } = useSWR(session_id ? `/api/checkout/${session_id}` : null, (url) =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  );
  const redirect = async () => {
    const receiptNumber = payment.generateReceipt();
    if (!session_id || !reservationId) return;
    const sessionId: string = Array.isArray(session_id)
      ? session_id!.join("")
      : session_id;
    const reservId: string = Array.isArray(reservationId)
      ? reservationId!.join("")
      : reservationId;
    const session = await getCheckOut(sessionId, reservId, receiptNumber);
    console.log(session);
    router.replace("/");
  };

  return (
    <section className="flex h-full justify-center items-center">
      <div className="flex flex-col gap-6">
        <AiFillCheckCircle size={70} className="text-green-500 m-auto" />
        <h2 className="text-2xl text-center">Payment Successful</h2>
        <h3 className="text-center">Thank you for choosing ACloneB</h3>

        <Button onClick={() => redirect()} label="Back to Home" />
      </div>
    </section>
  );
};

export default Success;
