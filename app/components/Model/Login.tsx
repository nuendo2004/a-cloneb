"use client";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import useLogin from "@/app/hooks/useLogin";
import useRegister from "@/app/hooks/useRegister";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoginModel } from "./custom/Abstract";
import { userLogin } from "@/app/service/userService";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

class LoginConcrete extends LoginModel {}

const Login = () => {
  const registerHook = useRegister();
  const loginhook = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: new LoginConcrete(),
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true);
    userLogin("credentials", {
      ...formData,
      redirect: false,
    })
      .then((res) => {
        setIsLoading(false);
        if (res?.ok) {
          toast.success("Welcome back");
          router.refresh();
          loginhook.onClose();
        }
        if (res?.error) {
          toast.error(res.error);
        }
      })
      .catch((e) => {
        toast.error("Oops, something went wrong...");
        console.log(e.response);
      })
      .finally(() => setIsLoading(false));
  };
  const toggleModel = useCallback(() => {
    loginhook.onClose();
    registerHook.onOpen();
  }, [loginhook, registerHook]);

  const content = (
    <div className="flex flex-col gap-4 px-2">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
        type="email"
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        error={errors}
        required
        type="password"
      />
    </div>
  );

  const footer = (
    <>
      <p className="w-full text-center leading-[1px] mt-[8px] mb-[8px] border-b-[1px] border-neutral-300">
        <span className="px-[10px] bg-white">or</span>
      </p>
      <div>
        <Button
          label="Continue with Google"
          outline
          icon={FcGoogle}
          onClick={() => {
            signIn("google");
          }}
        />
      </div>
      <div>
        <Button
          label="Continue with Facebook"
          outline
          icon={AiFillFacebook}
          onClick={() => {
            signIn("facebook");
          }}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center gap-2 justify-center">
          <div>First time using AcloneB?</div>
          <div
            onClick={toggleModel}
            className="text-blue-700 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Model
      title="Login"
      actionLabel="Continue"
      disabled={isLoading}
      isActive={loginhook.isActive}
      onClose={loginhook.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={content}
      footer={footer}
    />
  );
};

export default Login;
