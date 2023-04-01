"use client";
import WideSection from "../WideSection";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
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
              <Menu />
            </div>
          </div>
        </WideSection>
      </div>
    </nav>
  );
};

export default Navbar;