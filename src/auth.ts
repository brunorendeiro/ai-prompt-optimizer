import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { recordLogin } from "@/lib/kv";

function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const isAllowed = allowedEmails().includes(user.email.toLowerCase());
      if (isAllowed) await recordLogin(user.email);
      return isAllowed;
    },
  },
});
