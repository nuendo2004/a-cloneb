"use client";
import WideSection from "../WideSection";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useLocation from "@/app/hooks/useLocation";
import { useEffect } from "react";

interface NavbarProps {
  currentUser?: SafeUser | null;
  search?: boolean;
  fixed?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  search = true,
  fixed = false,
}) => {
  const router = useRouter();

  return (
    <nav className={`${fixed && "fixed"} w-full bg-white z-10 shadow-sm`}>
      <div className="py-4 border-b-[1px]">
        <WideSection>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div className="flex-1" onClick={() => router.push("/")}>
              <Logo />
            </div>
            <div className="flex-grow lg:flex-1 md:px-8">
              {search && <Search />}
            </div>
            <div className="flex flex-grow lg:flex-1 justify-end">
              <Menu currentUser={currentUser} />
            </div>
          </div>
        </WideSection>
      </div>
    </nav>
  );
};

export default Navbar;
