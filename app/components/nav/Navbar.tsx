"use client";
import WideSection from "../WideSection";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";
import Carousel from "../Carousel";
import { TfiArrowCircleLeft } from "react-icons/tfi";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="sticky w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <WideSection>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div className="flex-1">
              <Logo />
            </div>
            <div className="flex-1 px-8">
              <Search />
            </div>
            <div className="flex flex-1 justify-end">
              <Menu currentUser={currentUser} />
            </div>
          </div>
        </WideSection>
      </div>
      <Carousel button={TfiArrowCircleLeft} />
    </nav>
  );
};

export default Navbar;
