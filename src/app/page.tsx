import * as React from "react";
import MainLayout from "@/features/layout/MainLayout";
import { HeroPage } from "@/features/layout/Hero/HeroPage";

const Home = () => {
  return (
    <MainLayout>
      <HeroPage />
    </MainLayout>
  );
};

export default Home;
