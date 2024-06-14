import * as React from "react";
import { PublicLayout } from "../../features/layout/PublicLayout";


const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default ContactLayout;
