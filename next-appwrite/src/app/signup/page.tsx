import SignUpForm from "@/components/auth/sign-up-form";
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
  return (
    <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <Link href="/signin">Already have an account? Sign in.</Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default SignUpPage;
