import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // Adds user's name and email to the session
      name: string;
      email: string;
    };
  }
}
