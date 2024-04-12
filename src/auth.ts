import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "../data/user";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
import { UserRole } from "@prisma/client";

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
    // A function that updates the session user's id and role based on the provided token.
    async session({ token, session }) {
      if (session.user) {
        // add id to session
        if (token.sub) {
          session.user.id = token.sub;
        }
        // add role to session
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
        // add isTwoFactorEnabled to session
        if (token.isTwoFactorEnabled) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
