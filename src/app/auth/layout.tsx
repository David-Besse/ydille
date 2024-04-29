import React from "react";
import { asapFont } from "@/components/fonts/fonts";
import { cn } from "../../lib/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "w-full min-h-screen flex items-center justify-center bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat",
        asapFont.className
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
