"use client";

import { UserButton } from "@/app/(protected)/_components/user-button";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const currentUser = useCurrentUser();

  return (
    <nav className="fixed w-[90%] top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-between p-4 rounded-xl border-y-gray-400 border-y bg-white">
      <Link href="/" aria-label="Accueil" title="Accueil">
        <Image
          src="/img/idylle.png"
          alt="logo idylle"
          width={50}
          height={50}
          priority={false}
        />
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <p className="text-lg text-center">Bonjour<br /> {currentUser?.name} !</p>
        <UserButton />
      </div>
    </nav>
  );
};
