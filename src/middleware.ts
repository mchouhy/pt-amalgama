import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!session && ["/books", "/users", "/authors"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/books", "/users", "/login", "/authors"],
};
