"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowBigUp } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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

export const ScrollToTopIcon = () => {
  const [hidden, setHidden] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);
  const { scrollY } = useScroll();
  const currentPath = usePathname();

  let shadowColor = "";

  const hideScrollToTopIcon = (latest: number, prevScroll: number) => {
    if (latest < 50 && latest < prevScroll) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setPrevScroll(latest);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    hideScrollToTopIcon(latest, prevScroll);
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
      shadowColor = "animate-bounce";
      break;
  }

  return (
    <motion.div
      variants={parentVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        ease: [0.32, 0.72, 0, 1],
        duration: 0.4,
        staggerChildren: 0.05,
      }}
      className={cn(
        "text-gray-500 fixed bottom-8 right-8 sm:bottom-[10%] sm:right-[10%] rounded-xl z-50",
        shadowColor
      )}
    >
      <ArrowBigUp
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer"
      />
    </motion.div>
  );
};
