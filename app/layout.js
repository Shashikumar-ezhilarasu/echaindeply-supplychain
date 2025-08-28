import "./globals.css"
import React from "react";
import ClientNavbar from "@/components/navbar-client";
import { StickyBanner } from "@/components/ui/sticky-banner";

export const metadata = {
  title: "Supply Chain Traceability",
  description: "Track products through the entire supply chain",
  generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen">
        <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            🚀 Introducing Echain - Revolutionary Blockchain Supply Chain Traceability Platform.{" "}
            <a href="#" className="transition duration-200 hover:underline">
              Learn more
            </a>
          </p>
        </StickyBanner>
        <ClientNavbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
