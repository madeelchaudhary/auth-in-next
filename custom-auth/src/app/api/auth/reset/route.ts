import { createNewEntry } from "@/lib/resetting";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const user = await createNewEntry({ email });

    return NextResponse.json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    const { status, message } = error as Error & { status: number };

    return NextResponse.json({ error: message }, { status: status || 500 });
  }
};
