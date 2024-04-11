import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "../../../lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/features/layout/auth/login-button";

const font = Poppins({ subsets: ["latin"], weight: "600" });

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-[100vh] w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md text-white",
            font.className
          )}
        >
          Dashboard
        </h1>
        <p className="text-lg text-white">Authorisation d&apos;accès</p>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Se connecter
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default DashboardPage;
