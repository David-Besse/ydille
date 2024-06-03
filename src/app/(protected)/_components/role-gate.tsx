"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../../../hooks/useCurrentUser";
import { ToastMessage } from "@/features/layout/ToastMessage";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <ToastMessage
        message={{
          error: "Vous n'avez pas le droit d'accéder à cette page",
        }}
      />
    );
  }

  return <>{children}</>;
};
