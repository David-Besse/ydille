"use client";

import React from "react";
import { useCurrentUser } from "../../../../hooks/user";
import { LogoutButton } from "../../../features/layout/auth/logout-button";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div className=" flex flex-col h-full w-full items-center justify-center text-lg bg-white">
      <form>
        <LogoutButton>Se déconnecter</LogoutButton>
      </form>
    </div>
  );
};

export default SettingsPage;
