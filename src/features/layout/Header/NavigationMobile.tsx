"use client";

import { useCycle, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { NavigationMobileMenu } from "./NavigationMobileMenu";
import { NavigationMobileToggle } from "./NavigationMobileToggle";
import { ThemeToggle } from "@/theme/ThemeToggle";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(26px at 190px 40px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40,
    },
  },
};

export const NavigationMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    if (containerRef.current) {
      handleResize();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={dimensions.height}
      ref={containerRef}
      className="fixed top-0 right-0 bottom-0 w-[230px] md:hidden"
    >
      <motion.div
        className="absolute min-w-[230px] top-0 right-0 bottom-0 bg-white opacity-35"
        variants={sidebar}
      />
      <NavigationMobileMenu />
      <NavigationMobileToggle toggle={() => toggleOpen()} />
      <ThemeToggle />
    </motion.nav>
  );
};
