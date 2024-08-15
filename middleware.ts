import { auth } from "./src/lib/auth";

export { auth as middleware } from "@/src/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*"],
};
