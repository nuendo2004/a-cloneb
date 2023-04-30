import { create } from "zustand";
import { getPaymentUrl } from "../service/paymentService";
import { AxiosPromise } from "axios";

interface PaymentProps {
  onOpen: () => void;
  onClose: () => void;
}

const usePayment = create<PaymentProps>(() => ({
  onOpen: () => {},
  onClose: () => {},
}));

export default usePayment;
