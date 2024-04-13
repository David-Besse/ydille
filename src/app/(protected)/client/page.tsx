'use client';

import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { UserInfo } from "../_components/user-info";

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label="&#128187; Client component" />;
};
export default ClientPage;
