import { env } from "../../../../lib/env";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/nodemailer";

const backendURL = env.BACKEND_URL;

export const authOptions = {
  session: {
    strategy: "jwt" as "jwt" | "database" | undefined,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Connexion avec email",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const crdentialsDetails = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch(backendURL + "/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crdentialsDetails),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          console.log("check credentials");
          return null;
        }
      },
    }),
    // OAuth authentication providers...
    AppleProvider({
      clientId: env.APPLE_ID,
      clientSecret: env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: env.MAIL_SERVER,
      from: "NextAuth.js <no-reply@example.com>",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.email = user.data.auth.email;
        token.username = user.data.auth.userName;
        token.userType = user.data.auth.userType;
        token.accessToken = user.data.auth.token;
      }
      return token;
    },
    session: async ({ session, token, user }: any) => {
      if (token) {
        session.user.email = token.email;
        session.user.username = token.userName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
