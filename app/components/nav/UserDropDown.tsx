"use client";
import DropDownItem from "./DropDownItem";
import useRegister from "@/app/hooks/useRegister";
import useLogin from "@/app/hooks/useLogin";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

interface UserDropDownProps {
  currentUser?: SafeUser | null;
}
const UserDropDown: React.FC<UserDropDownProps> = ({ currentUser }) => {
  const registerhook = useRegister();
  const loginhook = useLogin();

  return (
    <div className="absolute rounded-xl shadow-md w-[40vh] md:w-[1/8] bg-white overflow-hidden right-24 top-16 text-sm">
      <div className="flex flex-col cursor-pointer">
        {currentUser ? (
          <>
            <DropDownItem onClick={registerhook.onOpen} label="My trips" />
            <DropDownItem onClick={loginhook.onOpen} label="My favorites" />
            <DropDownItem onClick={loginhook.onOpen} label="My reservations" />
            <DropDownItem onClick={loginhook.onOpen} label="My my properties" />
            <DropDownItem onClick={loginhook.onOpen} label="a-CloneB my home" />
            <hr />
            <DropDownItem onClick={() => signOut()} label="Logout" />
          </>
        ) : (
          <>
            <DropDownItem
              onClick={registerhook.onOpen}
              label="Sign up"
              className="font-bold"
            />
            <DropDownItem
              onClick={loginhook.onOpen}
              label="Login"
              className="text-neutral-500"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDropDown;
