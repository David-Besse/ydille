"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/layout/auth/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center p-4 rounded-xl shadow-sm gap-4">
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/settings/server" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings/server">Server</Link>
        </Button>
        <Button
          variant={pathname === "/settings/client" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings/client">Client</Link>
        </Button>
        <Button
          variant={pathname === "/settings" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings">Paramètres</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
