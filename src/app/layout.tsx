import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Toaster } from "sonner";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatluxe",
  description: "Web Whatsapp like chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="./favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="./favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={inter.className}>
        <Providers>
          {/* <header>header</header> */}
          <div className="flex h-screen border-[rgba(0,0,0,1)] border mx-auto">
            <main className="flex-1">{children}</main>
          </div>

          {/* toastify */}
          <Toaster
            position="top-left"
            richColors
            duration={2000}
            closeButton
            expand
            invert
            theme="system"
          />

          {/* <footer>footer</footer> */}
        </Providers>
      </body>
    </html>
  );
}
