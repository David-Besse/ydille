import React from "react";
import { asapFont } from "@/components/fonts/fonts";
import { cn } from "@/lib/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "h-full w-fit flex items-center justify-center",
        asapFont.className
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
