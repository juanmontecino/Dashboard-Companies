// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClientOnly } from "@/components/client-only";
import "./globals.css";

const noto = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard company | Juan Montecino",
  description: "PPS proyect",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={noto.className}>
          <ThemeProvider>
            {/* Componente adicional para contenido del cliente */}
            <ClientOnly>
              {children}
              <Toaster position="top-center" />
            </ClientOnly>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}