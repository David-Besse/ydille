import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link href="/" aria-label="Accueil" title="Accueil">
          <Image
            src="/img/idylle.png"
            alt="logo idylle"
            width={100}
            height={100}
            priority={false}
          />
        </Link>
      <p className="text-muted-foreground text-center">{label}</p>
    </div>
  );
};
