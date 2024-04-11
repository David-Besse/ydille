"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <span className="cursor-pointer" onClick={handleSignOut}>
      {children}
    </span>
  );
};
LogoutButton.displayName = "LogoutButton";
