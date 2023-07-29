import ResetForm from "@/components/auth/reset-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

function ResetPassword() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-20 px-4 gap-y-12 ">
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ResetForm />
        </CardContent>
      </Card>
    </main>
  );
}

export default ResetPassword;
