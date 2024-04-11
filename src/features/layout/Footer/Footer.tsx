import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import instaIcon from "../../../public/img/instagram.png";
import tripIcon from "../../../public/img/tripadvisor.png";
import facebookIcon from "../../../public/img/facebook.png";

export const Footer = () => {
  return (
    <footer className="h-fit w-full text-white text-lg">
      <div
        id="footer_links"
        className="flex flex-col order-2 w-full justify-between text-base py-2"
      >
        <div
          id="footer_rules"
          className="flex flex-col md:flex-row h-fit md:gap-4 lg:p-2 p-1 justify-center items-center"
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
