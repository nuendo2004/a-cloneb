import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Register from "./components/Model/Register";
import ToasterWrapper from "./components/Toaster";

export const metadata = {
  title: "A CloneB",
  description: "Best reservation app for your next journey",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterWrapper />
        <Register />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
