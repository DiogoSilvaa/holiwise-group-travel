import NextAuth from "next-auth";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // https://github.com/nextauthjs/next-auth/issues/8660
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: KyselyAdapter(db as any),
  providers: [],
});
