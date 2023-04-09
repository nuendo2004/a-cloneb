"use client";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import useRegister from "@/app/hooks/useRegister";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RegisterModel } from "./custom/Abstract";
import { userRegister } from "@/app/service/userService";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLogin from "@/app/hooks/useLogin";

class RegisterConcrete extends RegisterModel {}

const Register = () => {
  const registerhook = useRegister();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: new RegisterConcrete(),
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true);
    userRegister(formData)
      .then(() => {
        registerhook.onClose();
      })
      .catch((e) => {
        toast.error("Oops, something went wrong...");
        console.log(e.response);
      })
      .finally(() => setIsLoading(false));
  };
  const loginHook = useLogin();
  const toggleModel = useCallback(() => {
    loginHook.onOpen();
    registerhook.onClose();
  }, [loginHook, registerhook]);

  const content = (
    <div className="flex flex-col gap-4 px-2">
      <Heading title="Welcome to ACloneB" subtitle="Create an account" />
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        error={errors}
        required
        type="text"
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
          onClick={() => signIn("google")}
        />
      </div>
      <div>
        <Button
          label="Continue with Facebook"
          outline
          icon={AiFillFacebook}
          onClick={() => signIn("facebook")}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={toggleModel}
            className="text-blue-700 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Model
      title="Register"
      actionLabel="Continue"
      disabled={isLoading}
      isActive={registerhook.isActive}
      onClose={registerhook.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={content}
      footer={footer}
    />
  );
};

export default Register;
