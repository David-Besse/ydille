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
  BookOpenCheckIcon,
  GalleryVertical,
  Grid2X2Icon,
  LogOut,
  User,
  UtensilsCrossedIcon,
} from "lucide-react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { LogoutButton } from "@/features/layout/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-state="closed">
        <Avatar className="w-12 h-12 hover:scale-125 cursor-pointer">
          <AvatarImage src={user && user.image ? user.image : ""} />
          <AvatarFallback className="bg-gray-500 text-white hover:border hover:text-gray-500 hover:bg-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-white w-[180px]"
      >
        <DropdownMenuGroup>
          <Link href="/gestion">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <Grid2X2Icon className="mr-2 h-4 w-4" />
              Accueil gestion
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/evenements">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <BookOpenCheckIcon className="mr-2 h-4 w-4" />
              Gérer les évènements
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/galerie">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <GalleryVertical className="mr-2 h-4 w-4" />
              Gérer la galerie
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/carte">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <UtensilsCrossedIcon className="mr-2 h-4 w-4" />
              Gérer la carte
            </DropdownMenuItem>
          </Link>
          <Link href="/gestion/profil">
            <DropdownMenuItem className="flex items-start justify-start hover:border">
              <User className="mr-2 h-4 w-4" />
              Mon profil
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
