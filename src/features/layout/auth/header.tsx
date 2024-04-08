import React from "react";
import { poppinsFont } from "@/components/fonts/fonts";
import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", poppinsFont.className)}>
        Connexion
      </h1>
      <p className="text-muted-foreground text-center">{label}</p>
    </div>
  );
};
