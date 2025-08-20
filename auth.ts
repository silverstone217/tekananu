import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { BETTER_AUTH_SECRET } from "./utils/envVariables";
import type { JWT } from "next-auth/jwt";
import { roleUserType } from "./types/auth";
import { loginSchema } from "./schema/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/connexion",
    // signOut: '/auth/logout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: null // Will disable the new account creation screen
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const parsed = loginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const verifyPassword = await compare(password, user.password);

        if (!verifyPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as roleUserType,
          phone: user.phone,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],

  secret: BETTER_AUTH_SECRET, // Clé secrète pour sécuriser les tokens
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token && session.user) {
        const tokenId = token.sub;
        if (tokenId) {
          const user = await prisma.user.findUnique({
            where: {
              id: tokenId,
            },
          });
          if (user) {
            session.user = {
              id: user.id,
              name: user.name,
              email: user.email ? user.email : "",
              emailVerified: user.emailVerified,
              image: user.image,
              role: user.role as roleUserType,
              phone: user.phone,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          }
        }
      }
      return session;
    },
  },
});
