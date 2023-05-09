import axios from "axios";
import { FieldValues } from "react-hook-form";

const addNewProperty = (data: FieldValues) => {
  return axios.post("/api/listings", data);
};

const unlikeListing = (listingId: string) => {
  return axios.delete(`/api/favorites/${listingId}`);
};
const likeListing = (listingId: string) => {
  return axios.post(`/api/favorites/${listingId}`);
};

const createReservation = (reservation: {
  totalPrice: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  listingId: string;
}) => {
  return axios.post("/api/reservations", reservation);
};

const cancelReservation = (id: string) => {
  console.log("deleting", id);
  return axios.delete(`/api/reservations/${id}`);
};

export {
  addNewProperty,
  likeListing,
  unlikeListing,
  createReservation,
  cancelReservation,
};
