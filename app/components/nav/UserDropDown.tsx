"use client";
import DropDownItem from "./DropDownItem";
import useRegister from "@/app/hooks/useRegister";
import useLogin from "@/app/hooks/useLogin";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentHome from "@/app/hooks/useRentHome";

interface UserDropDownProps {
  currentUser?: SafeUser | null;
}
const UserDropDown: React.FC<UserDropDownProps> = ({ currentUser }) => {
  const registerhook = useRegister();
  const loginhook = useLogin();
  const rentModel = useRentHome();

  return (
    <div className="z-10 absolute rounded-xl shadow-md w-[40vh] md:w-[1/8] bg-white overflow-hidden xl:right-24 right-16 top-16 text-sm">
      <div className="flex flex-col cursor-pointer">
        {currentUser ? (
          <>
            <DropDownItem onClick={registerhook.onOpen} label="My trips" />
            <DropDownItem onClick={loginhook.onOpen} label="My favorites" />
            <DropDownItem onClick={loginhook.onOpen} label="My reservations" />
            <DropDownItem onClick={loginhook.onOpen} label="My my properties" />
            <DropDownItem onClick={rentModel.onOpen} label="ACloneB my home" />
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
