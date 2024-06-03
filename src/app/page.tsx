import * as React from "react";
import { PublicLayout } from "@/features/layout/PublicLayout";
import { HeroPage } from "@/features/layout/Hero/HeroPage";
import { Contact } from "@/features/layout/Contact/Contact";
import { Gallery } from "@/features/layout/Gallery/Gallery";
import { MenuCard } from "@/features/layout/MenuCard/MenuCard";

const Home = () => {
  return (
    <PublicLayout>
      <HeroPage />
      <Gallery />
      <Contact />
      <MenuCard />
    </PublicLayout>
  );
};

export default Home;
