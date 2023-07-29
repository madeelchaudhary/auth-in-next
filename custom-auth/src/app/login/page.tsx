import SignInForm from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <SignInForm />
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap justify-between gap-4 flex-1">
            <Link href="/signup">Don&apos;t have an account?</Link>
            <Link href="/reset">Forgot password?</Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default LoginPage;
