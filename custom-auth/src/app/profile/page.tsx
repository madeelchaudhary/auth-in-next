import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import React from "react";
import mongoose from "mongoose";
import { connect } from "@/lib/db";
import { User } from "@/models/users";
import Logout from "@/components/auth/logout";
import { jwtVerify } from "jose";

async function ProfilePage() {
  const token = cookies().get("auth:Token")?.value!;
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  if (!payload || !payload.id) {
    return redirect("/login");
  }

  const { email, id } = payload as any;
  const objectId = new mongoose.Types.ObjectId(id);

  await connect();

  const user = await User.findOne({ _id: objectId });

  if (!user) {
    return redirect("/login");
  }

  const { fullName, isVerified } = user;

  return (
    <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
      {!isVerified && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
          <p className="font-bold">Please verify your email</p>
        </div>
      )}
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col space-y-2">
            <p className="text-gray-500">Name</p>
            <p className="text-gray-900">{fullName}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-500">Email</p>
            <p className="text-gray-900">
              <a href="mailto:johndoe@example.com">{email}</a>
            </p>
          </div>
          <Logout />
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfilePage;
