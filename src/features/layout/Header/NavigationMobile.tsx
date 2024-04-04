"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const NavigationMobile = () => {
  return (
    <div className="text-white block self-center md:hidden">
      <Drawer direction="bottom">
        <DrawerTrigger>
          <MenuIcon size={48} />
        </DrawerTrigger>
        <DrawerContent className="justify-center items-center gap-4 font-semibold bg-white bg-opacity-90 pb-6">
          <Link href="/" aria-label="Accueil">
            Accueil
          </Link>
          <Link href="/carte" aria-label="Carte">
            Carte
          </Link>
          <Link href="/galerie" aria-label="Galerie">
            Galerie
          </Link>
          <Link href="/contact" aria-label="Contact">
            Nous contacter
          </Link>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
