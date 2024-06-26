import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "../data/user";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "../data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    // Async function to handle user sign-in
    async signIn({ user, account }) {
      // Allow Oauth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      // Prevents sign in if email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Prevents sign in if 2FA is enabled
      if (existingUser.isTwoFactorEnabled) {
        // Get 2FA confirmation
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        // If 2FA is not confirmed, return false
        if (!twoFactorConfirmation) {
          return false;
        }

        // If 2FA is confirmed, delete 2FA confirmation
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount; // check if user has an account, if not, isOAuth is false

      return token;
    },
    // A function that updates the session based on the provided token.
    async session({ token, session }) {
      if (session.user && token.sub) {
        // add id to session
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        // add role to session
        session.user.role = token.role as UserRole;
      }

      if (session.user && token.isTwoFactorEnabled) {
        // add isTwoFactorEnabled to session
        session.user.isTwoFactorEnabled = Boolean(token.isTwoFactorEnabled);
      }

      if (session.user && token.email && token.name && token.isOAuth) {
        // add email to session
        session.user.email = token.email;
        // add name to session
        session.user.name = token.name;
        // add isOAuth to session
        session.user.isOAuth = !!token.isOAuth;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
