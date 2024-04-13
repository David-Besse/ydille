"use client";

import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { LogoutButton } from "../../../features/layout/auth/logout-button";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div className="flex items-center rounded justify-center text-lg bg-white p-4">
      <div>
        <LogoutButton>Déconnecter {user?.email}</LogoutButton>
      </div>
    </div>
  );
};

export default SettingsPage;
