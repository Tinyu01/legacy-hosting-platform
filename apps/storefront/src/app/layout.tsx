import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Legacy Hosting | Infrastructure built for your next move",
    template: "%s | Legacy Hosting",
  },
  description:
    "Domains, web hosting, cloud VPS and dedicated infrastructure — managed from one platform. ZAR billing, South African support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
