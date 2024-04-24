import { NextRequest } from "next/server";

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export function middleware(req: NextRequest) {
//   console.log("hello from middleware function");
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/documents",
// };
