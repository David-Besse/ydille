import { currentUserFromServer } from "../../../lib/currentUserServerAccess";
import { UserInfo } from "../_components/user-info";

const ServerPage = async () => {
  const user = await currentUserFromServer();

  return <UserInfo user={user} label="&#128187; Server component" />;
};
export default ServerPage;
