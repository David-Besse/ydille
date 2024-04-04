import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import instaIcon from "../../../public/img/instagram.png";
import tripIcon from "../../../public/img/tripadvisor.png";

export const Footer = () => {
  return (
    <footer className="h-fit flex flex-col w-full text-white text-lg gap-4 justify-end">
      <div
        id="footer_social"
        className="flex flex-col w-fit self-center gap-4 order-1"
      >
        <div className="flex gap-8 justify-center">
          <Link
            href="https://www.instagram.com/lidylle_biscarrosse/"
            target="_blank"
          >
            <Image
              src={instaIcon}
              alt="instagram"
              className="w-10 h-10 md:w-12 md:h-12 hover:scale-125 border-white border-2 rounded-2xl animate-bounce hover:animate-none bg-white"
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
              className="w-10 h-10 md:w-12 md:h-12 hover:scale-125 border-white border-2 rounded-2xl animate-bounce hover:animate-none bg-white"
            />
            <span className="sr-only">tripadvisor</span>
          </Link>
        </div>
      </div>

      <div
        id="footer_links"
        className="flex flex-col md:flex-row order-2 w-full justify-between text-base pb-2"
      >
        <div
          id="footer_rules"
          className="flex flex-col md:flex-row h-fit gap-1 lg:gap-8 lg:p-2 p-1"
        >
          <Link
            href="/mentions-legales"
            className="hover:bg-white hover:text-black hover:rounded-md lg:p-2 w-fit self-center p-1"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="hover:bg-white hover:text-black hover:rounded-md lg:p-2 w-fit self-center  p-1"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="/CGU"
            className="hover:bg-white hover:text-black hover:rounded-md lg:p-2 w-fit self-center  p-1"
          >
            CGU
          </Link>
        </div>

        <div
          id="footer_copyright"
          className="flex items-center justify-center p-2"
        >
          <p className="h-fit">
            © 2024 - créé par{" "}
            <Link href={"mailto:davidb.webdev@gmail.com"}>
              <span className="hover:bg-white hover:text-black hover:rounded-md p-2">
                DBWD
              </span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
