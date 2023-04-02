import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Register from "./components/Model/Register";
import ToasterWrapper from "./components/Toaster";
import Login from "./components/Model/Login";
import getCurrentUser from "./actions/getCurrentUser";

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
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
