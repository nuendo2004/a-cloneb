"use client";
import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import UserDropDown from "./UserDropDown";
import { SafeUser } from "@/app/types";
import useLogin from "@/app/hooks/useLogin";
import useRentHome from "@/app/hooks/useRentHome";
import useOnclickOutside from "react-cool-onclickoutside";
interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [dropDown, setDropdown] = useState(false);
  const loginHook = useLogin();
  const renthomeHook = useRentHome();
  const toggleDropDown = useCallback(() => {
    setDropdown((state) => !state);
  }, []);

  const onOpenRentHome = useCallback(() => {
    if (!currentUser) {
      return loginHook.onOpen();
    }
    renthomeHook.onOpen();
  }, [currentUser, loginHook, renthomeHook]);

  const ref = useOnclickOutside(() => {
    setDropdown(false);
  });

  return (
    <div>
      <div className="flex flex-center gap-2 items-center">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onOpenRentHome}
        >
          Cloneb your home
        </div>
        <BiGlobe size={18} className="mr-2 hidden md:block" />
        <div
          onClick={toggleDropDown}
          className="p-2 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 md:rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-2xl md:text-xl" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      <div ref={ref}>
        {dropDown && (
          <UserDropDown currentUser={currentUser} setDropDown={setDropdown} />
        )}
      </div>
    </div>
  );
};

export default Menu;
