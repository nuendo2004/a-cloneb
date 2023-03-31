"use client";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-[6px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6 text-center">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-5 border-x-[1px] flex-1 text-center">
          Any week
        </div>
        <div className="text-sm pl-5 pr-2 text-gray-500 flex items-center gap-2">
          <div className="hidden sm:block">Add guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
