'use client'

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@/components/ui/button";
import { SunMedium, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="md:absolute md:right-4 md:top-4 w-fit h-fit p-0"
    >
      <SunMedium
        size={32}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={32}
        className="absolute rotate-100 scale-0 transition-all duration-1000 dark:-rotate-0 dark:scale-100"
      />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
};
