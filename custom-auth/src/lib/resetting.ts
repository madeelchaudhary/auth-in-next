import { User } from "@/models/users";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { sendResetPasswordEmail } from "./mail";

interface UserData {
  email: string;
}

export async function createNewEntry(data: UserData) {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new Error("User does not exist", { status: 404 } as any);
  }

  if (!user.isVerified) {
    throw new Error("You need to verify your email first", {
      status: 400,
    } as any);
  }

  //   if (
  //     user.verifyToken &&
  //     user.verifyTokenExpiry &&
  //     Date.now() > user.verifyTokenExpiry.getMilliseconds()
  //   ) {
  //     throw new Error("Token is already generated", { status: 400 } as any);
  //   }

  const resetToken = randomUUID();
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  await sendResetPasswordEmail(user.email, resetToken);
}

export async function verifyEntry(token: string, password: string) {
  const user = await User.findOne({
    resetToken: token,
  });

  if (!user) {
    throw new Error("Invalid token", { cause: "INVALID_TOKEN" });
  }

  if (!user.isVerified) {
    throw new Error("User is not verified.", { cause: "NOT_VERIFIED" });
  }

  if (user.resetTokenExpiry && new Date() > user.resetTokenExpiry) {
    throw new Error("Token is already generated", { cause: "TOKEN_EXPIRED" });
  }

  const hashedPassword = await hash(password, 10);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return user;
}
