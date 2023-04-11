"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartProp {
  listingId: string;
  currentUser: SafeUser | null;
}
const Heart: React.FC<HeartProp> = ({ listingId, currentUser }) => {
  const { isFavorite, toggle } = useFavorite({ listingId, currentUser });
  return (
    <div
      onClick={toggle}
      className="relative hover:opacity-80 transion cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${isFavorite ? "fill-rose-500" : "fill-neutral-600/80"}`}
      />
    </div>
  );
};

export default Heart;
