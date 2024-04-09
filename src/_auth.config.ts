import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;

      // Initialize protected routes
      const isOnProtected = nextUrl.pathname.startsWith("/dashboard");

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [google], // Add providers with an empty array for now
} satisfies NextAuthConfig;
