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
import { cn } from "../../../../lib/utils";
import Link from "next/link";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

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
    <div className="self-center border-b-2 border-white text-white hidden md:block pb-2">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col md:flex-row">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
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
                <ListItem href="/carte" title="Notre carte">
                  Découvrez nos entrées, plats, desserts, boissons et tapas
                </ListItem>
                <ListItem href="tel:+33585098714" title="Réservation">
                  Réserver à l&apos;avance
                  <br />
                  au 05 58 09 87 14
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/galerie" accessKey="" legacyBehavior passHref>
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
                Se connecter
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-wrap",
              className
            )}
            {...props}
          >
            <p className="text-sm font-bold leading-none">{title}</p>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
