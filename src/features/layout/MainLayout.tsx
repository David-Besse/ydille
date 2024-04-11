import * as React from "react";
import { Footer } from "@/features/layout/Footer/Footer";
import { Header } from "@/features/layout/Header/Header";
import Socials from "@/features/layout/Socials/Socials";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col w-full h-full justify-between">
      <Header />
      <main className="flex w-full justify-center items-center">
        {children}
      </main>
      <Footer />
      <Socials />
    </div>
  );
};

export default MainLayout;
