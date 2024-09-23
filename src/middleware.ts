import NextAuth from "next-auth";
import authConfig from "../auth.config";
import {
  ApiAuthPrefix,
  AuthRoutes,
  DEFAULT_LOGIN_REDIRECT,
  PublicRoutes,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
  const isPublicRoutes = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = AuthRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined;
  }
  if (isAuthRoutes) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedin && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
