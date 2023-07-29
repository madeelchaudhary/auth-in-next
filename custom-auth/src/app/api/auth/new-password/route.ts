import { NextRequest, NextResponse } from "next/server";
import { verifyEntry } from "@/lib/resetting";

export const POST = async (req: NextRequest) => {
  try {
    const { token, password } = await req.json();
    await verifyEntry(token, password);

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log(error);
    const { message, cause } = error as Error;
    let status = 500;
    if (cause === "INVALID_TOKEN") {
      status = 400;
    } else if (cause === "NOT_VERIFIED") {
      status = 400;
    } else if (cause === "TOKEN_EXPIRED") {
      status = 400;
    }

    return NextResponse.json({ error: message }, { status });
  }
};
