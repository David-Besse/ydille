import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { NavigationDesktop } from "./NavigationDesktop";
import { NavigationMobile } from "./NavigationMobile";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full h-fit flex md:flex-col p-4 z-10 bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat bg-top bg-fixed justify-between">
      <div className="self-center">
        <Link href="/" aria-label="Accueil" title="Accueil">
          <Image
            src="/img/idylle.png"
            alt="logo idylle"
            width={100}
            height={100}
            priority={false}
          />
        </Link>
      </div>
      <NavigationDesktop />
      <NavigationMobile />
    </header>
  );
};
