import * as React from "react";
import { PublicLayout } from "@/features/layout/PublicLayout";
import { HeroPage } from "@/features/layout/Hero/HeroPage";
import { Contact } from "@/features/layout/Contact/Contact";
import { Gallery } from "@/features/layout/Gallery/Gallery";
import { MenuCard } from "@/features/layout/MenuCard/MenuCard";
import { ScrollToTopIcon } from "@/features/layout/ScrollToTopIcon";

const Home = () => {
  return (
    <PublicLayout>
      <HeroPage />
      <Gallery />
      <Contact />
      <MenuCard />
      <ScrollToTopIcon />
    </PublicLayout>
  );
};

export default Home;
