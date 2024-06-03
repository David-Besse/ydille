import * as React from "react";
import MainLayout from "@/features/layout/MainLayout";


const GalerieLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default GalerieLayout;
