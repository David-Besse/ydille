import Link from "next/link";
import React from "react";
import instaIcon from "../../../public/img/instagram.png";
import tripIcon from "../../../public/img/tripadvisor.png";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-between z-10 gap-8 pt-8 text-slate-600 text-sm">
      <div
        id="footer_social"
        className="flex justify-center gap-8 p-2 border rounded-xl order-1"
      >
        <Link
          href="https://www.instagram.com/lidylle_biscarrosse/"
          target="_blank"
        >
          <Image
            src={instaIcon}
            alt="instagram"
            className="w-12 h-12 hover:border-2 hover:border-gray-800 rounded-xl"
          />
          <span className="sr-only">instagram</span>
        </Link>
        <Link
          href="https://www.tripadvisor.fr/Restaurant_Review-g656490-d1326143-Reviews-L_Idylle-Biscarrosse_Landes_Nouvelle_Aquitaine.html?m=19905"
          target="_blank"
        >
          <Image
            src={tripIcon}
            alt="tripadvisor"
            className="w-12 h-12 hover:border-2 hover:border-gray-800 rounded-xl"
          />
          <span className="sr-only">tripadvisor</span>
        </Link>
      </div>

      <div
        id="footer_rules"
        className="flex flex-col items-center justify-center gap-2 p-2 order-2"
      >
        <Link
          href="/mentions-legales"
          className=" hover:text-slate-800 hover:underline hover:underline-offset-2"
        >
          Mentions légales
        </Link>
        <Link
          href="/politique-de-confidentialite"
          className=" hover:text-slate-800 hover:underline hover:underline-offset-2"
        >
          Politique de confidentialité
        </Link>
        <Link
          href="/CGU"
          className=" hover:text-slate-800 hover:underline hover:underline-offset-2"
        >
          CGU
        </Link>
      </div>

      <div
        id="footer_copyright"
        className="flex items-end justify-center p-2 order-3"
      >
        <p className=" hover:text-slate-800 text-sm">
          © 2024 - créé par{" "}
          <Link href={"mailto:davidb.webdev@gmail.com"}>
            <span className=" hover:text-slate-800 hover:underline hover:underline-offset-2">
              DBWD
            </span>
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};
