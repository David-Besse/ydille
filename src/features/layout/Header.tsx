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
import "./styles_header.css";

export const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 h-fit max-w-5xl w-full flex flex-col p-2 justify-between z-10 bg-white border-b-2">
      <div className="flex pb-4 w-full justify-center">
        <Link href="/" className="flex items-center">
          <h1 id="logo_title" className="antialiased">
            L&apos;IDYLLE
          </h1>
        </Link>
      </div>
      <NavigationMenu className="max-w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Le restaurant
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3 ">
                  <Image
                    src="/img/idylle.png"
                    alt="pieds dans le sable"
                    width={200}
                    height={201}
                    className="rounded-lg"
                    placeholder="blur"
                    blurDataURL="/img/idylle.png"
                  />
                </li>
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
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
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
});
ListItem.displayName = "ListItem";
