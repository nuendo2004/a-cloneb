import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Register from "./components/Model/Register";
import RentHome from "./components/Model/RentHome";
import ToasterWrapper from "./components/Toaster";
import Login from "./components/Model/Login";
import getCurrentUser from "./actions/getCurrentUser";
import Script from "next/script";
import TripDetail from "./trips/TripDetail";
import ManageReservation from "./reservations/ManageReservation";
import Search from "./components/Model/Search";

export const metadata = {
  title: "A CloneB",
  description: "Best reservation app for your next journey",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col`}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        />
        <Search />
        <ToasterWrapper />
        <Register />
        <Login />
        <RentHome />
        <TripDetail />
        <ManageReservation />
        <div className="pd-20 pt-26 flex-grow">{children}</div>
      </body>
    </html>
  );
}
