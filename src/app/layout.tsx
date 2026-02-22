import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Lumière — Fine Jewelry",
  description: "Where Precious Meets Timeless. Handcrafted luxury jewelry — rings, necklaces, earrings, bracelets, and bespoke pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
