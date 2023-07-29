import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { cookies } from "next/dist/client/components/headers";
import { SignJWT } from "jose";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Please fill in all fields", { status: 400 } as any);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist", { status: 404 } as any);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials", { status: 401 } as any);
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      name: user.fullName,
    };
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("7d")
      .sign(secret);

    cookies().set("auth:Token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ message: "Logged in successfully" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
      status: error.status || 500,
    });
  }
};
