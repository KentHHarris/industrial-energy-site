import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battery Site Designer",
  description: "Configure your industrial power plant and layout",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

// export const favoteIcon = "/favicon.ico";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
