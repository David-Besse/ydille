/**
 * These routes are public and do not require authentication
 */
export const publicRoutes: string[] = ["/", "/carte", "/galerie", "/contact", "/auth/new-verification"];

/**
 * These routes are public, used for auhentication and do not require authentication.
 * These routes redirect logged users to /settings
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset-password", "/auth/new-password"];

/**
 * The prefix of the API routes.
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

/*
 * The default login redirect
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
