import NextAuth, { Session, User } from "next-auth";
import google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createUser } from "../queries/createUser.query";
import { getUser } from "../queries/getUser.query";

type AuthObject = {
  auth: {
    user?: Session["user"];
  };
};

const authConfig = {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        if (user.email) {
          const existingUser = await getUser(user.email);

          if (!existingUser)
            await createUser({
              email: user.email,
              name: user.name ?? "",
              role: "customer",
            });

          return true;
        }
        return false;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      if (session.user?.email) {
        const user = await getUser(session.user.email);
        if (user && session.user) {
          session.user.role = user.role;
          session.user.customerId = user.id;
        }
      }
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
