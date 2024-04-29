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
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-[url('/img/plage.jpg')] bg-cover bg-no-repeat py-32">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
