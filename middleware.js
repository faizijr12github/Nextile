import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Paths that don't require authentication
const publicPaths = ["/", "/login", "/buyerRegistration", "/supplierRegistration", "/inspectionTeamRegistration","/registerPage","/explore","/insights","/predict","/eda","/downloads"]

// Role-based path mapping
const rolePathMap = {
  admin: [
    "/admin-dashboard",
    "/buyerProfile",
    "/supplierProfile",
    "/inspectionTeamProfile",
    "/manageBuyer",
    "/manageSupplier",
    "/manageTeam",
    "/admin", // This covers all admin/* routes
  ],
  buyer: ["/buyerProfile", "/manageBuyer"],
  supplier: ["/supplierProfile", "/manageSupplier"],
  inspection: ["/inspectionTeamProfile", "/manageTeam"],
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes
  if (pathname.includes("/api/")) {
    return NextResponse.next()
  }

  // Check if the path is public
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If no token, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Get user role from token
  const userRole = token.role

  // Check if user has access to the requested path
  const hasAccess = rolePathMap[userRole] && rolePathMap[userRole].some((path) => pathname.startsWith(path))

  // If no access, redirect to unauthorized page
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
}
