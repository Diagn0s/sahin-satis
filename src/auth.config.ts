import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/giris",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Note: we'll extend the type in auth.ts so role is recognized
      const isAdmin = (auth?.user as any)?.role === "ADMIN";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnUserPanel = nextUrl.pathname.startsWith("/panel");
      
      if (isOnAdmin) {
        if (isLoggedIn && isAdmin) return true;
        return Response.redirect(new URL("/auth/giris", nextUrl));
      }

      if (isOnUserPanel) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/auth/giris", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
} satisfies NextAuthConfig;
