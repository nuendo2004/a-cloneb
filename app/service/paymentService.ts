import axios from "axios";

const getPaymentUrl = (paymentInfo: {
  reservationId: string;
  price: number;
  unit: number;
  propertyName: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout`;
  return axios.post(url, { ...paymentInfo, price: paymentInfo.price * 100 });
};

const getCheckOut = (
  sessionId: string,
  reservationId: string,
  receiptNumber: string
) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout/${sessionId}`;
  return axios.post(url, { reservationId, receiptNumber });
};

export { getPaymentUrl, getCheckOut };
