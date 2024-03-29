import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import { Header } from "@/features/layout/Header";
import { Footer } from "@/features/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background h-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <div className="flex flex-col m-auto max-w-5xl">
              <Header />
              <main className="pt-[157px] bg-yellow-100 bg-opacity-10">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
