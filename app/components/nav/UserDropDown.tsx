"use client";
import MenuItem from "./MenuItem";

const UserDropDown = () => {
  return (
    <div className="absolute rounded-xl shadow-md w-[40vh] md:w-[1/8] bg-white overflow-hidden right-24 top-16 text-sm">
      <div className="flex flex-col cursor-pointer">
        <>
          <MenuItem onClick={() => {}} label="Sign up" className="font-bold" />
          <MenuItem
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
