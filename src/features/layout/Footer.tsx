import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full min-h-[50px] flex bg-slate-200 p-2 justify-between">
      <div id="footer_left" className="flex flex-col">
        <Link
          href="/mentions-legales"
          className="text-slate-600 hover:text-slate-800"
        >
          Mentions légales
        </Link>
        <Link
          href="/politique-de-confidentialite"
          className="text-slate-600 hover:text-slate-800"
        >
          Politique de confidentialité
        </Link>
        <Link href="/CGU" className="text-slate-600 hover:text-slate-800">
          CGU
        </Link>
      </div>
      <div id="footer_right" className=""></div>
      <Link
        href="https://www.instagram.com/lidylle_biscarrosse/"
        className="text-slate-600 hover:text-slate-800"
      >
        <TwitterLogoIcon className="w-6 h-6" />
      </Link>
    </div>
  );
};
