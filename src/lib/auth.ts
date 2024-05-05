import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "mo@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!(credentials?.email || credentials?.password)) {
          return null;
        }
        const existsUser = await db.user.findFirst({
          where: { email: credentials?.email },
        });
        if (!existsUser) {
          return null;
        }
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          existsUser.password
        );
        if (!isPasswordMatch) {
          return null;
        }
        return {
          id: existsUser.id,
          email: existsUser.email,
          name: existsUser.name,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};

export const isAuth = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return session;
  }
  return false;
};
export const getAuth = () => {
  const session = getServerSession(authOptions);
  return session;
};
