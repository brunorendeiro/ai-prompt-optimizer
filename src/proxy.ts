import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_PATHS = new Set(["/", "/ads.txt"]);
const PUBLIC_FILE = /\.(jpg|jpeg|png|svg|webp|ico)$/;

export default auth((req) => {
  const path = req.nextUrl.pathname;
  if (PUBLIC_PATHS.has(path) || PUBLIC_FILE.test(path)) {
    return NextResponse.next();
  }

  if (req.auth) return NextResponse.next();

  if (path.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/sign-in", req.nextUrl.origin);
  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: ["/((?!api/auth|sign-in|_next/static|_next/image|favicon.ico).*)"],
};
