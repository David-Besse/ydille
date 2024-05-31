import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTopIcon } from "./_components/scrollToTop-icon";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen w-full items-center justify-center">
        <Navbar />
        {children}
        <Toaster />
        <ScrollToTopIcon />
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
