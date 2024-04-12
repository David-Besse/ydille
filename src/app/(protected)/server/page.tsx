import { useCurrentUserServer } from "../../../../hooks/useCurrentUserServer";
import { UserInfo } from "../_components/user-info";

const ServerPage = async () => {
  const user = await useCurrentUserServer();

  return <UserInfo user={user} label="Server component" />;
};
export default ServerPage;
