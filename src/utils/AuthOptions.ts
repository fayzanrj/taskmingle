
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
  
          // api request for login
          const res = await fetch(`${process.env.HOST}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
  
          const user = await res.json();
  
          if (user) {
            return user;
          } else {
            return null;
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