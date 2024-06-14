"use server";

import { currentRoleFromServer } from "@/lib/currentUserServerAccess";

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const admin = async () => {
  const role = await currentRoleFromServer();

  if (role === UserRole.ADMIN) {
    return { success: "Vous avez le droit d'accéder à cette page" };
  }

  return {
    error: "Vous n'avez pas le droit d'accéder à cette page",
  };
};
