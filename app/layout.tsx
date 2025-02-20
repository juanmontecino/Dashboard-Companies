import type { Metadata } from "next";
import { Noto_Sans_Display, } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";

const noto = Noto_Sans_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard company | Juan Montecino",
  description: "PPS proyect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={noto.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}