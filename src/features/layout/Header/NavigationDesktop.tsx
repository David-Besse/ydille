"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

export const NavigationDesktop = () => {
  const [menuLinkVisible, setMenuLinkVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "1") {
        event.preventDefault();
        event.stopPropagation();
        setMenuLinkVisible(!menuLinkVisible);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuLinkVisible]);

  return (
    <div className="self-center border-b-2 border-white text-white hidden md:block py-2">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col md:flex-row">
          <NavigationMenuItem>
            <Link href="#hero" scroll={false} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                Accueil
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Le restaurant
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-3 p-4 w-[20rem]">
                <Link href="#menucard" legacyBehavior passHref>
                  <ListItem title="Notre carte">
                    Découvrez nos entrées, plats, desserts, boissons et tapas
                  </ListItem>
                </Link>
                <Link
                  href="tel:+33585098714"
                  scroll={false}
                  legacyBehavior
                  passHref
                >
                  <ListItem title="Réservation">
                    Réserver à l&apos;avance
                    <br />
                    au 05 58 09 87 14
                  </ListItem>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="#contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="#gallery" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                Galerie
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {menuLinkVisible && (
            <NavigationMenuItem>
              <Link
                href="/auth/login"
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                Gestion
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
