import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";

const adminPassword = env.ADMIN_PASSWORD;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        console.log("received", credentials);
        if (
          credentials?.username === "dobby" &&
          credentials?.password === adminPassword
        ) {
          return { id: "dobby", authed: true };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.authed = token.authed ?? false;
      return session;
    },
    jwt({ token, user }) {
      if (user) token.authed = user.authed;
      return token;
    },
  },
  pages: {
    signIn: "/admin/signin",
  },
  secret: env.AUTH_SECRET,
};

export default NextAuth(authOptions);
