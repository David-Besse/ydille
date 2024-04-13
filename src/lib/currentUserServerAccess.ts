// This file is used to access the current session from the server side
import { auth } from "@/auth";

export const currentUserFromServer = async () => {
  const session = await auth();
  return session?.user;
};

export const currentRoleFromServer = async () => {
  const session = await auth();
  return session?.user?.role;
}