import NewPasswordForm from "@/components/auth/new-password";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/models/users";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    token: string;
  };
}

async function UpdatePasswordPage({ params }: Props) {
  const { token } = params;

  const user = await User.findOne({ resetToken: token });

  if (!user) {
    notFound();
  }

  let content = (
    <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <NewPasswordForm token={token} />
      </CardContent>
    </Card>
  );

  if (user.resetTokenExpiry && new Date() > user.resetTokenExpiry) {
    content = (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <p className="font-bold">Reset token expired</p>
      </div>
    );
  }

  if (!user.isVerified) {
    content = (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <p className="font-bold">Please verify your email</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-20 px-4 gap-y-12 ">
      {content}
    </main>
  );
}

export default UpdatePasswordPage;
