"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./styles.css";

export const Header = () => {
  return (
    <header className="flex bg-slate-200 p-2 justify-between">
      <div className="flex flex-col items-center">
        <h1
          id="logo_title"
          className="antialiased"
        >
          IDYLLE
        </h1>
        {/* <span id="logo_subtitle" className="text-sm font-bold">CHILL OUT CLUB</span> */}
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex justify-between">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Le restaurant</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col from-muted/50 to-muted p-1 outline-none focus:shadow-md"
                      href="/galerie"
                    >
                      <Image
                        src="/img/piedsdanslesable.jpg"
                        alt="Pieds dans le sable"
                        width={200}
                        height={200}
                        className="w-full rounded-xl"
                        priority
                      />
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/carte" title="Notre carte">
                  Découvrez nos plats, desserts, boissons et autres
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
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Se connecter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
