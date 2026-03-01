import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sailing Timy | Sail Croatia with a World Circumnavigator",
  description: "Experience the Adriatic with Peter, a skipper who sailed 30,000+ nautical miles around the world. Charter a 51ft Cyclades sailboat from Krk, Croatia. No deposit, professional skipper included.",
  keywords: "sailing croatia, yacht charter krk, sailing adriatic, circumnavigation, sailboat charter, skipper croatia",
  openGraph: {
    title: "Sailing Timy | Sail Croatia with a World Circumnavigator",
    description: "Experience the Adriatic with Peter, a skipper who sailed 30,000+ nautical miles around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
