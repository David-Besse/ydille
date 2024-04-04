import * as React from "react";
import type { Metadata } from "next";
import { handleeFont } from "@/components/fonts/fonts";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Header } from "@/features/layout/Header/Header";
import { Footer } from "@/features/layout/Footer";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Idylle Club",
  description: "Idylle Club website",
  keywords:
    "idylle, club, restaurant, plage, biscarrosse, mariage, evenement, tapas, cocktail, lounge, chill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
          async
          defer
        ></script>
      </Head>
      <body
        className={cn(
          handleeFont.className,
          "bg-background bg-[url('/img/transats.jpg')] bg-cover bg-no-repeat bg-top bg-fixed"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col w-full min-h-screen justify-between">
            <Header />
            <main className="flex w-full justify-center items-center py-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
