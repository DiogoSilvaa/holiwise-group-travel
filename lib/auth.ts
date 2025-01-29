import NextAuth from "next-auth";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: KyselyAdapter(db as any),
  providers: [],
});
