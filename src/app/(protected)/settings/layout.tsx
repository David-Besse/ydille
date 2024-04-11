import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/app/(protected)/_components/navbar";

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col h-full w-full items-center justify-start">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default SettingsLayout;
