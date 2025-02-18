import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    // JWT holds user info to keep them logged in securely.
    // This function runs when JWT is created/updated
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Saves user's info to the JWT token
        token.name = profile.name
        token.email = profile.email
        
        console.log('User Info:', profile.name, profile.email);
      }
      return token
    },

    // This function runs when the session is also created/updated
    async session({ session, token }) {
      // Attaches user's info to the session
      session.user.name = token.name as string
      session.user.email = token.email as string
      return session
    },

    // This function runs after successful authentication
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirects to /hello-world
      return `${baseUrl}/hello-world`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
