import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    BACKEND_URL: z.string().url(),
    APPLE_ID: z.string(),
    APPLE_SECRET: z.string(),
    FACEBOOK_ID: z.string(),
    FACEBOOK_SECRET: z.string(),
    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    MAIL_SERVER: z.string().url(),
  },
  client() {},
  runtimeEnv: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    APPLE_ID: process.env.APPLE_ID,
    APPLE_SECRET: process.env.APPLE_SECRET,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    MAIL_SERVER: process.env.MAIL_SERVER,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
});
