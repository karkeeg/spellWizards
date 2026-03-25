import type { Metadata } from "next";
import { Poppins, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "SpellWizards - Epic Spelling Adventure",
  description:
    "Master spelling through game-based learning and fun challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${syne.variable} antialiased`}>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
