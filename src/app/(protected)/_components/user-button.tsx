"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import {
  GalleryVertical,
  HomeIcon,
  LogOut,
  NotebookTextIcon,
  User,
} from "lucide-react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { LogoutButton } from "@/features/layout/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-state="closed">
        <Avatar className="w-8 h-8 hover:scale-125 cursor-pointer">
          <AvatarImage src={user && user.image ? user.image : ""} />
          <AvatarFallback className="bg-sky-500 text-white hover:border hover:text-sky-500 hover:bg-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="bg-white w-[160px]"
      >
        <DropdownMenuGroup>
          <Link href="/gestion/carte">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <NotebookTextIcon className="mr-2 h-4 w-4" />
              Gérer la carte
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/galerie">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <GalleryVertical className="mr-2 h-4 w-4" />
              Gérer la galerie
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/profil">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <User className="mr-2 h-4 w-4" />
              Mon compte
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-start justify-start hover:border">
          <LogoutButton>
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
