import Link from "next/link";
import Image from "next/image";
import instaIcon from "../../../../public/img/instagram.png";
import tripIcon from "../../../../public/img/tripadvisor.png";
import facebookIcon from "../../../../public/img/facebook.png";

export const Socials = () => {
  return (
    <div
      id="footer_social"
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-row w-fit gap-2 md:gap-4 p-2 rounded-e-xl z-10"
    >
      <Link
        href="https://www.instagram.com/lidylle_biscarrosse/"
        target="_blank"
        title="instagram"
        aria-label="instagram"
      >
        <Image
          src={instaIcon}
          alt="instagram"
          className="w-10 h-10 md:w-12 md:h-12 opacity-70 hover:scale-110 hover:opacity-100 border-white border-2 rounded-2xl bg-white"
        />
        <span className="sr-only">instagram</span>
      </Link>
      <Link
        href="https://www.facebook.com/idylle.restaurant/?locale=fr_FR"
        target="_blank"
        title="facebook"
        aria-label="facebook"
      >
        <Image
          src={facebookIcon}
          alt="facebook"
          className="w-10 h-10 md:w-12 md:h-12 opacity-70 hover:scale-110 hover:opacity-100 border-white border-2 rounded-2xl bg-white"
        />
        <span className="sr-only">facebook</span>
      </Link>
      <Link
        href="https://www.tripadvisor.fr/Restaurant_Review-g656490-d1326143-Reviews-L_Idylle-Biscarrosse_Landes_Nouvelle_Aquitaine.html?m=19905"
        target="_blank"
        title="tripadvisor"
        aria-label="tripadvisor"
      >
        <Image
          src={tripIcon}
          alt="tripadvisor"
          className="w-10 h-10 md:w-12 md:h-12 opacity-70 hover:scale-110 hover:opacity-100 border-white border-2 rounded-2xl bg-white"
        />
        <span className="sr-only">tripadvisor</span>
      </Link>
    </div>
  );
};
