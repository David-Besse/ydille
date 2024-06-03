import * as React from "react";
import { Footer } from "@/features/layout/Footer/Footer";
import { Header } from "@/features/layout/Header/Header";
import { Socials } from "@/features/layout/Socials/Socials";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat bg-top bg-fixed">
      <Header />
      <main className="flex flex-col w-full h-full justify-around items-center">
        {children}
      </main>
      <Footer />
      <Socials />
    </div>
  );
};
