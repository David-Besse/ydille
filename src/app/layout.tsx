import * as React from "react";
import type { Metadata } from "next";
import { handleeFont } from "@/components/fonts/fonts";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { cn } from "../../lib/utils";
import "./globals.css";
import { Header } from "@/features/layout/Header/Header";
import { Footer } from "@/features/layout/Footer";
import Socials from "@/features/layout/Socials/Socials";

export const metadata: Metadata = {
  title: "Idylle Club",
  description: "Idylle Club website",
  keywords:
    "idylle, club, restaurant, plage, biscarrosse, mariage, evenement, tapas, cocktail, lounge, chill",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          handleeFont.className,
          "bg-background bg-[url('/img/transats.jpg')] bg-cover bg-no-repeat bg-top bg-fixed h-screen"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex flex-col w-full h-full justify-between">
            <Header />
            <main className="flex w-full justify-center items-center">
              {children}
            </main>
            <Footer />
            <Socials />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
