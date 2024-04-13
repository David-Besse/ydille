// This file is used to access the current session from the client side
import { useSession } from "next-auth/react";

// This is a hook to get the user
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};

// This is a hook to get the user role
export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user?.role;
};
