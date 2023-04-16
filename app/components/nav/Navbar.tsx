"use client";
import WideSection from "../WideSection";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useLocation from "@/app/hooks/useLocation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const { setLocation } = useLocation();

  const userLocation = navigator.geolocation.getCurrentPosition((loc) =>
    setLocation([loc.coords.latitude, loc.coords.longitude])
  );
  return (
    <nav className="sticky w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <WideSection>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div className="flex-1" onClick={() => router.push("/")}>
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
    </nav>
  );
};

export default Navbar;
