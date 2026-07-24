import "server-only";
import { cache } from "react";
import { auth } from "@/auth";

export const verifySession = cache(async () => {
  const session = await auth();
  if (!session?.user?.email) return null;
  return session;
});
