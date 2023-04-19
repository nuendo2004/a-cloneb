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
      <body className={font.className}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        />

        <ToasterWrapper />
        <Register />
        <Login />
        <RentHome />
        <TripDetail />
        <ManageReservation />
        <Navbar currentUser={currentUser} />
        <div className="pd-20 pt-26">{children}</div>
      </body>
    </html>
  );
}
