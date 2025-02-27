import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return res;
}

export const config = {
  matcher: ["/api/verifyPayment", "/api/session", "/api/session/:path*"],
};
