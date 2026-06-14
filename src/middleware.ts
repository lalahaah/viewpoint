/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl
  const role = (req.auth?.user as any)?.role

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/dashboard") && !role) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/dashboard/creator") && role !== "CREATOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/sponsor", req.url))
  }
  if (pathname.startsWith("/dashboard/sponsor") && role !== "SPONSOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/creator", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
