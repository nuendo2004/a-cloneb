import axios from "axios";
import { FieldValues } from "react-hook-form";

const addNewProperty = (data: FieldValues) => {
  return axios.post("api/listings", data);
};

const unlikeListing = (listingId: string) => {
  return axios.delete(`/api/favorites/${listingId}`);
};
const likeListing = (listingId: string) => {
  return axios.post(`/api/favorites/${listingId}`);
};

export { addNewProperty, likeListing, unlikeListing };
