import axios from "axios";
import { FieldValues } from "react-hook-form";

const registerUser = (userData: FieldValues) => {
  return axios.post("/api/register", userData);
};

export { registerUser };
