"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.webp"
      alt="logo"
      className="lg:block cursor-pointer hidden"
      height="120"
      width="120"
    />
  );
};

export default Logo;
