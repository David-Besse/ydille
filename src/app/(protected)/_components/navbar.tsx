"use client";

import { UserButton } from "@/app/(protected)/_components/user-button";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

// VARIANTS
const parentVariants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -50,
  },
};

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const { scrollY } = useScroll();
  const currentUser = useCurrentUser();
  const currentPath = usePathname();

  let shadowColor = "";
  const defaultShadowColor = "shadow-[0_0_4px_4px_rgb(0,0,0,1)]";

  const hideNavbarOnScrollChanges = (latest: number, prevScroll: number) => {
    if (latest > 50 && latest > prevScroll) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setPrevScroll(latest);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    hideNavbarOnScrollChanges(latest, prevScroll);
    setPrevScroll(latest);
  });

  switch (currentPath) {
    case "/gestion/evenements":
      shadowColor = "shadow-[0_0_4px_4px_rgb(186,230,253,1)]";
      break;

    case "/gestion/profil":
      shadowColor = "shadow-[0_0_4px_4px_rgb(252,165,165,1)]";
      break;

    case "/gestion/galerie":
      shadowColor = "shadow-[0_0_4px_4px_rgb(254,215,170,1)]";
      break;

    case "/gestion/carte":
      shadowColor = "shadow-[0_0_4px_4px_rgb(167,243,208,1)]";
      break;

    default:
      shadowColor = defaultShadowColor;
      break;
  }

  return (
    <motion.nav
      variants={parentVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        ease: [0.32, 0.72, 0, 1],
        duration: 0.4,
        staggerChildren: 0.05,
      }}
      className={cn(
        "fixed top-0 z-50 w-[90%] sm:max-w-[800px] flex items-center justify-between p-4 rounded-b-xl bg-white",
        shadowColor
      )}
    >
      <Link href="/" aria-label="Retour au site" title="Retour au site">
        <Image src="/img/idylle.svg" alt="logo idylle" width={60} height={60} />
      </Link>

      <p className="text-gray-700 text-xl font-semibold flex flex-col justify-center items-center">
        Bonjour {currentUser?.name} !<br />
        {shadowColor !== defaultShadowColor && (
          <span className="italic text-sm text-gray-400 flex gap-2">
            le menu se trouve vers ici <ArrowRightIcon className="w-4 h-4" />
          </span>
        )}
      </p>

      <div className="flex gap-2 items-center justify-center">
        <UserButton />
      </div>
    </motion.nav>
  );
};
