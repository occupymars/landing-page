import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";
import BackgroundPattern from "@/components/backgroundPattern";

const specialElite = Special_Elite({
  variable: "--font-special-elite-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Occupy Mars",
  description: "Technology and media consultancy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${specialElite.variable} antialiased h-screen`}>
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
