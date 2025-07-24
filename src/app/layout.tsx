import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
// import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "../components/Header";

import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Convince Your Boss to Pay for GitKraken",
  description:
    "NeckbeardAI is a fictional persona that is an exaggeration of the most stubborn and old-school developer on your team. If you can convince Neckbeard, you can confidently convince anyone. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased dark`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
