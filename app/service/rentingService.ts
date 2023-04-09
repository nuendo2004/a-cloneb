import axios from "axios";
import { FieldValues } from "react-hook-form";

const addNewProperty = (data: FieldValues) => {
  return axios.post("api/listings", data);
};

export { addNewProperty };
