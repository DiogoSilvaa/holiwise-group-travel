import { db } from "@/lib/db";
import { KyselyAdapter } from "@auth/kysely-adapter";
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // https://github.com/nextauthjs/next-auth/issues/8660
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: KyselyAdapter(db as any),
  callbacks: {
    session: async ({ session, user }: { session: Session; user: User }): Promise<Session> => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
