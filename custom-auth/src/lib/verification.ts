import { User } from "@/models/users";
import { hash, encodeBase64 } from "bcryptjs";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "./mail";

interface UserData {
  email: string;
}

export async function createNewEntry(data: UserData) {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("User does not exist", { status: 404 } as any);
  }

  if (user.isVerified) {
    throw new Error("User is already verified", { status: 400 } as any);
  }

  //   if (
  //     user.verifyToken &&
  //     user.verifyTokenExpiry &&
  //     Date.now() > user.verifyTokenExpiry.getMilliseconds()
  //   ) {
  //     throw new Error("Token is already generated", { status: 400 } as any);
  //   }

  // const verifyToken = await hash(user._id.toString(), 10);
  const verifyToken = randomUUID();
  const verifyTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  user.verifyToken = verifyToken;
  user.verifyTokenExpiry = verifyTokenExpiry;
  await user.save();

  await sendVerificationEmail(user.email, verifyToken);
}

export async function verifyEntry(token: string) {
  const user = await User.findOne({
    verifyToken: token,
  });

  if (!user) {
    throw new Error("Invalid token", { cause: "INVALID_TOKEN" });
  }

  if (user.isVerified) {
    throw new Error("User is already verified", { cause: "ALREADY_VERIFIED" });
  }

  if (user.verifyTokenExpiry && new Date() > user.verifyTokenExpiry) {
    throw new Error("Token is already generated", { cause: "TOKEN_EXPIRED" });
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();

  return user;
}
