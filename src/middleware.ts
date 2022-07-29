import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname === "/"
  ) {
    return;
  }

  const slug = request.nextUrl.pathname.split("/").pop();
  const result = await fetch(`${request.nextUrl.origin}/api/get-url/${slug}`);
  const data = await result.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
