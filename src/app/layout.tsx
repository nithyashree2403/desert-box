import type { Metadata } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Be_Vietnam_Pro, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Dessert Box",
  description: "Handcrafted delights from our atelier straight to your doorstep.",
};

import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${plusJakarta.variable} ${beVietnam.variable} ${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fef4f6] text-[#322d2f] font-sans">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
        <Navbar />
        {children}
        <CartDrawer />
        <CheckoutModal />
      </body>
    </html>
  );
}
