import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { connect } from "@/lib/db";
import { createNewEntry } from "@/lib/verification";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { email, password, firstName, lastName, newsletter } =
      await req.json();
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      newsletter === undefined
    )
      throw new Error("Missing fields", { status: 400 } as any);

    const prevUser = await User.findOne({ email });

    if (prevUser)
      throw new Error("User already exists", { status: 400 } as any);
    const fullName = `${firstName} ${lastName}`;
    const hashedPassword = await hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      fullName,

      newsletter,
    });

    const result = await user.save();

    await createNewEntry({ email });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
};
