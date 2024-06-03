"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../../../hooks/useCurrentUser";
import { FormError } from "@/features/layout/FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="Vous n'avez pas le droit d'accéder à cette page" />
    );
  }

  return <>{children}</>;
};
