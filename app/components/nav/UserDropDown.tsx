"use client";
import DropDownItem from "./DropDownItem";
import useRegister from "@/app/hooks/useRegister";
import useLogin from "@/app/hooks/useLogin";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentHome from "@/app/hooks/useRentHome";
import { useRouter } from "next/navigation";

interface UserDropDownProps {
  currentUser?: SafeUser | null;
  setDropDown: (state: boolean) => void;
}
const UserDropDown: React.FC<UserDropDownProps> = ({
  currentUser,
  setDropDown,
}) => {
  const registerhook = useRegister();
  const loginhook = useLogin();
  const rentModel = useRentHome();
  const router = useRouter();

  const redirect = (location: string) => {
    router.push(location);
    setDropDown(false);
  };

  return (
    <div className="z-10 absolute rounded-xl shadow-md w-[40vh] md:w-[1/8] bg-white overflow-hidden xl:right-24 right-16 top-16 text-sm">
      <div className="flex flex-col cursor-pointer">
        {currentUser ? (
          <>
            <DropDownItem onClick={() => redirect("/trips")} label="My trips" />
            <DropDownItem
              onClick={() => redirect("/favorite")}
              label="My favorites"
            />
            <DropDownItem
              onClick={() => redirect("/reservations")}
              label="My reservations"
            />
            <DropDownItem
              onClick={() => redirect("/listings")}
              label="My my properties"
            />
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
