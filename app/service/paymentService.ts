import axios from "axios";

const getPaymentUrl = (paymentInfo: {
  price: number;
  propertyName: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout`;
  return axios.post(url, { ...paymentInfo, price: paymentInfo.price * 100 });
};

export { getPaymentUrl };
