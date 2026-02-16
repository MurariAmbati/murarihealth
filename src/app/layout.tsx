import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MurariHealth — Comprehensive Health Intelligence",
  description: "Personal health management, lab tracking, symptom NLP, doctor scheduling, and health modeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
