import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define tus rutas públicas
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/uploadthing(.*)", // Usa regex para rutas dinámicas
]);

// 2. Configura el middleware
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth(); // Protege todas las rutas no públicas
  }
});

// 3. Configuración de Next.js
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Excluye archivos estáticos y rutas Next.js
    "/", 
    "/(api|trpc)(.*)" // Incluye todas las API routes
  ],
};