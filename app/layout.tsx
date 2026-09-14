import type { Metadata } from "next";
import { Poppins, Sora } from "next/font/google";

import "./globals.css";
import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Handi-X | Building Beyond Limits",
  description:
    "Helping businesses tell their stories, reach the right audience and build memorable brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${poppins.variable}`}>
        <Navbar />

        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}