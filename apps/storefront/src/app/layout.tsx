import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Legacy Hosting — Domains, Hosting & Cloud VPS",
    template: "%s · Legacy Hosting",
  },
  description:
    "Register domains, deploy cloud servers and host websites with ZAR billing and South African support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className={inter.variable}>
      <body className="min-h-screen font-sans text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
