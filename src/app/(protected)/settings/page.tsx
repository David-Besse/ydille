"use client";

import { useCurrentUserClient } from "../../../../hooks/useCurrentUserClient";
import { LogoutButton } from "../../../features/layout/auth/logout-button";

const SettingsPage = () => {
  const user = useCurrentUserClient();

  return (
    <div className="flex items-center rounded justify-center text-lg bg-white p-4">
      <div>
        <LogoutButton>Déconnecter {user?.email}</LogoutButton>
      </div>
    </div>
  );
};

export default SettingsPage;
