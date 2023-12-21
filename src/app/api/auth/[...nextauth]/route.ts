import { authOptions } from "@/utils/AuthOptions";
import NextAuth from "next-auth/next";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  isVerified: boolean;
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

