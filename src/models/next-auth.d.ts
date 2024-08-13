import "next-auth";

declare module "next-auth" {
  interface User {
    customerId?: string;
  }

  interface Session {
    user?: {
      customerId?: string;
    } & DefaultSession["user"];
  }
}
