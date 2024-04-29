/**
 * These routes are public and do not require authentication
 */
export const publicRoutes: string[] = [
  "/",
  "/carte",
  "/galerie",
  "/contact",
  "/auth/new-verification",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/CGU"
];

/**
 * These routes are public, used for auhentication and do not require authentication.
 * These routes redirect logged users to /gestion
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];

/**
 * The prefix of the API routes.
 * Routes that start with this prefix are used for API authentication purposes
 * !!REQUIRED ROUTE for NexthAuth to work
 */
export const apiAuthPrefix: string = "/api/auth";

/*
 * The default login redirect
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/gestion";
