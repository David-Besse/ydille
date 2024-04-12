// for client
import { useSession } from "next-auth/react";

export const useCurrentUserClient = () => {
  const session = useSession();
  return session.data?.user;
};