import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware triggered for:", req.nextUrl.pathname);

    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res;
}

export const config = {
    matcher: ["/api/session/:path*", "/api/verifyPayment"],
};
