import * as React from "react";
import MainLayout from "@/features/layout/MainLayout";


const CarteLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default CarteLayout;
