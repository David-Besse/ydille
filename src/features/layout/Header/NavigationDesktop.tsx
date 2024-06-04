"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollLink } from "./ScrollLink";

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
    <div className="sticky self-center border-b-2 border-white text-white hidden md:block py-2">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col md:flex-row">
          <NavigationMenuItem>
            <ScrollLink
              href="#hero"
              className={`${navigationMenuTriggerStyle()} bg-transparent`}
            >
              Accueil
            </ScrollLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Le restaurant
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-3 p-4 w-[20rem]">
                <li>
                  <ScrollLink
                    href="#menucard"
                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-wrap"
                  >
                    <p className="text-sm font-bold leading-none">
                      Notre carte
                    </p>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Découvrez nos entrées, plats, desserts, boissons et tapas
                    </p>
                  </ScrollLink>
                </li>

                <li>
                  <a
                    href="tel:+33585098714"
                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-wrap"
                  >
                    <p className="text-sm font-bold leading-none">
                      Réservation
                    </p>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Réserver à l&apos;avance
                      <br />
                      au 05 58 09 87 14
                    </p>
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ScrollLink
              href="#contact"
              className={`${navigationMenuTriggerStyle()} bg-transparent`}
            >
              Contact
            </ScrollLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ScrollLink
              href="#gallery"
              className={`${navigationMenuTriggerStyle()} bg-transparent`}
            >
              Galerie
            </ScrollLink>
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
