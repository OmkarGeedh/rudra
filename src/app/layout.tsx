import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R.U.D.R.A.",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <style>
{/* @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap'); */}
</style>
        <nav>
        {/* {!!session &&
        <Logout />
        }
        {!session &&
        <Link href="/login">Login</Link> */}
      </nav>
        {children}</body>
    </html>
  );
}
