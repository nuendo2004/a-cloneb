import axios from "axios";
import { FieldValues } from "react-hook-form";
import { LiteralUnion, SignInOptions, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

const userRegister = (userData: FieldValues) => {
  return axios.post("/api/register", userData);
};

const userLogin = (
  provider: LiteralUnion<BuiltInProviderType>,
  option: SignInOptions
) => {
  return signIn(provider, option);
};

const sendEmail = (email: string, body?: string) => {
  return axios.post("../api/email", { email: email, emailBody: body });
};

export { userRegister, userLogin, sendEmail };
