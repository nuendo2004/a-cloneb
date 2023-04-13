"use client";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  height?: number;
  width?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, height, width }) => {
  return (
    <Image
      src={src ? src : "/images/avatar.webp"}
      className="rounded-full"
      height={height || 30}
      width={width || 30}
      alt="user avatar"
    />
  );
};

export default Avatar;
