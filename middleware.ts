import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("hello from middleware function");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/documents",
};
