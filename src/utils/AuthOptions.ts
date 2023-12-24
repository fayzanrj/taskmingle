import axios from "axios";
import prisma from "@/app/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtAccessToken } from "@/libs/Jwt";
import bcrypt from "bcryptjs";

interface UserProps {
  id: string;
  name: string;
  email: string;
  isVerified: boolean | null;
  profilePic: string | null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // @ts-ignore
      async authorize(credentials, req) {
        // destructuring data
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const data = { email, password };

        try {
          const userExists = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (!userExists) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compareSync(
            password,
            userExists.password
          );

          if (!isPasswordCorrect) {
            return new Response(JSON.stringify(null));
          }

          const newUser: UserProps = {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            isVerified: userExists.isVerified,
            profilePic: userExists.profilePic,
          };

          const accessToken = signJwtAccessToken(newUser);
          const user = {
            ...newUser,
            accessToken,
          };

          if (user) {
            console.log(user);
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
