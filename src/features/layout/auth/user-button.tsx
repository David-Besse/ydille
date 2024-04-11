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
import { LogOut, Settings, User } from "lucide-react";
import { useCurrentUser } from "../../../../hooks/user";
import { LogoutButton } from "@/features/layout/auth/logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-state="closed">
        <Avatar className="w-8 h-8 hover:scale-125">
          <AvatarImage src={user ? user.image : ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="bg-white w-[160px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-start justify-start hover:border">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-start justify-start hover:border">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </DropdownMenuItem>
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
