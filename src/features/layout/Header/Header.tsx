"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationDesktop } from "./NavigationDesktop";
import { NavigationMobile } from "./NavigationMobile";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/theme/ThemeToggle";

export const Header = () => {
  const [imgSize, setImgSize] = useState(100);
  const refHeader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = (): void => {
      if (refHeader.current && window.innerWidth < 426) {
        setImgSize(50);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [refHeader]);

  return (
    <header
      ref={refHeader}
      className="absolute top-0 left-0 w-full h-fit flex items-center justify-start md:flex-col p-4 z-10 bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat bg-top bg-fixed"
    >
      <Link href="/" aria-label="Accueil" title="Accueil">
        <Image
          src="/img/idylle.png"
          alt="logo idylle"
          priority={false}
          width={imgSize}
          height={imgSize}
          className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] cursor-pointer"
        />
      </Link>

      <NavigationDesktop />

      <NavigationMobile />
    </header>
  );
};
