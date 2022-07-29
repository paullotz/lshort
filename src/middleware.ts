import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api/get-url/")) {
        console.log("retunrdsd");
        return;
    }

    const slug = request.nextUrl.pathname.split("/").pop();
    const data = await (
        await fetch(`${request.nextUrl.origin}/api/get-url/${slug}`)
    ).json();
    if (data?.url) {
        return NextResponse.redirect(data.url);
    }
}
