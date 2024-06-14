import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

// mirror the props of next/link component
type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;
type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren;

export const ScrollLink = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    //remove everything before the hash
    const targetId = e.currentTarget.href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    if (!elem) {
      return; // Handle cases where the target element doesn't exist
    }

    const currentScrollY = window.scrollY; // Get current scroll position
    const targetTop = elem.getBoundingClientRect().top + currentScrollY; // Calculate target element's absolute top position

    if (targetTop !== currentScrollY) {
      // Only scroll if positions are different
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  );
};
