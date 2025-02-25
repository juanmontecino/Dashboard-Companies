import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware(async (authPromise, req) => {
  if (!isPublicRoute(req)) {
    const auth = await authPromise;
    auth.protect(); // Accede directamente a la propiedad protect de auth
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};