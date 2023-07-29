"use client";
import SignUpForm from "@/components/auth/sign-up-form";
import SuccessfullSignUp from "@/components/auth/success";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function SignUpPage() {
  const [accountEmail, setAccountEmail] = React.useState<string>("");

  function handleSignUpSuccess(email: string) {
    setAccountEmail(email);
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-20 px-4 gap-y-12 ">
      {accountEmail && <SuccessfullSignUp email={accountEmail} />}
      {!accountEmail && (
        <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
          <CardHeader>
            <CardTitle>Sign up for account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignUpForm onSignUp={handleSignUpSuccess} />
          </CardContent>
          <CardFooter>
            <Link href="/login">Already have an account?</Link>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}

export default SignUpPage;
