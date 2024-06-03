"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationDesktop } from "./NavigationDesktop";
import { NavigationMobile } from "./NavigationMobile";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { useDeviceDetection } from "../../../../hooks/useDeviceDetection";

export const Header = () => {
  const device = useDeviceDetection();

  return (
    <header className="sticky top-0 left-0 w-full h-fit flex md:flex-col p-4 z-10 bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat bg-top bg-fixed justify-between">
      <div className="self-center">
        <Link href="/" aria-label="Accueil" title="Accueil">
          <Image
            src="/img/idylle.png"
            alt="logo idylle"
            width={device ? 50 : 100}
            height={device ? 50 : 100}
            priority={false}
          />
        </Link>
      </div>
      <ThemeToggle />
      <NavigationDesktop />
      <NavigationMobile />
    </header>
  );
};
