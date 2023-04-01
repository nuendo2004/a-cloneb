"use client";
import DropDownItem from "./DropDownItem";
import useRegister from "@/app/hooks/useRegister";

const UserDropDown = () => {
  const registerhook = useRegister();

  return (
    <div className="absolute rounded-xl shadow-md w-[40vh] md:w-[1/8] bg-white overflow-hidden right-24 top-16 text-sm">
      <div className="flex flex-col cursor-pointer">
        <>
          <DropDownItem
            onClick={registerhook.onOpen}
            label="Sign up"
            className="font-bold"
          />
          <DropDownItem
            onClick={() => {}}
            label="Login"
            className="text-neutral-500"
          />
        </>
      </div>
    </div>
  );
};

export default UserDropDown;
