"use client";
import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import UserDropDown from "./UserDropDown";
import { SafeUser } from "@/app/types";

interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [dropDown, setDropdown] = useState(false);
  const toggleDropDown = useCallback(() => {
    setDropdown((state) => !state);
  }, []);

  return (
    <div>
      <div className="flex flex-center gap-2 items-center">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Cloneb your home
        </div>
        <BiGlobe size={18} className="mr-2 hidden md:block" />
        <div
          onClick={toggleDropDown}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
        {dropDown && <UserDropDown currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default Menu;
