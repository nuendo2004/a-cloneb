import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Register from "./components/Model/Register";
import RentHome from "./components/Model/RentHome";
import ToasterWrapper from "./components/Toaster";
import Login from "./components/Model/Login";
import getCurrentUser from "./actions/getCurrentUser";
import Carousel from "./components/Carousel";

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
        <ToasterWrapper />
        <Register />
        <Login />
        <RentHome />
        <Navbar currentUser={currentUser} />
        <div className="pd-20 pt-26">{children}</div>
      </body>
    </html>
  );
}
