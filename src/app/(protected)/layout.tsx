import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { Toaster } from "@/components/ui/sonner";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col h-full w-full items-center justify-center gap-y-6 bg-white">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
