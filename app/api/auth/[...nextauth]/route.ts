import { db } from "@/lib/db";
import { KyselyAdapter } from "@auth/kysely-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: KyselyAdapter(db as any),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
