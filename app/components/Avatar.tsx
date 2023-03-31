"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/images/avatar.webp"
      className="rounded-full"
      height={30}
      width={30}
      alt="user avatar"
    />
  );
};

export default Avatar;
