import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const notAuthRoutes = ["/signup", "/login"];

export default async function handler(req: NextRequest) {
  const token = req.cookies.get("auth:Token")?.value || "";
  const path = req.nextUrl.pathname;

  if (protectedRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!token) return NextResponse.next();
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (!payload) throw new Error("Invalid token");

    if (notAuthRoutes.includes(path) && payload.id) {
      return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};
