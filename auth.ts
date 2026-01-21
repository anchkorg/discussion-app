import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import authConfig from "./auth.config";

export const { handlers, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    ...authConfig,
    callbacks: {
    async session({ session, user }) {
        if (session.user) {
            session.user.id = user.id;
            }
        return session;
        },
    },
});
