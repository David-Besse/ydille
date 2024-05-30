"use client";

import { UserButton } from "@/app/(protected)/_components/user-button";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const currentUser = useCurrentUser();
  const currentPath = usePathname();
  let shadowColor = "";

  switch (currentPath) {
    case "/gestion/evenements":
      shadowColor = "shadow-[0_0_4px_4px_rgb(186,230,253,1)]";
      break;

    case "/gestion/profil":
      shadowColor = "shadow-[0_0_4px_4px_rgb(252,165,165,1)]";
      break;

    case "/gestion/galerie":
      shadowColor = "shadow-[0_0_4px_4px_rgb(254,215,170,1)]";
      break;

    case "/gestion/carte":
      shadowColor = "shadow-[0_0_4px_4px_rgb(167,243,208,1)]";
      break;

    default:
      shadowColor = "shadow-[0_0_4px_4px_rgb(0,0,0,1)]";
      break;
  }

  return (
    <nav
      className={cn(
        "fixed w-[90%] sm:w-2/3 top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-between p-4 rounded-b-xl bg-white z-50",
        shadowColor
      )}
    >
      <Link href="/" aria-label="Accueil" title="Accueil">
        <Image
          src="/img/idylle.svg"
          alt="logo idylle"
          width={50}
          height={50}
        />
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <p className="text-lg text-center">
          Bonjour
          <br /> {currentUser?.name} !
        </p>
        <UserButton />
      </div>
    </nav>
  );
};
