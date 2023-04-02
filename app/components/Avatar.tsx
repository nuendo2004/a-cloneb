"use client";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src ? src : "/images/avatar.webp"}
      className="rounded-full"
      height={30}
      width={30}
      alt="user avatar"
    />
  );
};

export default Avatar;
