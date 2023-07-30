import SignInForm from "@/components/auth/sign-in-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function SignInPage() {
  return (
    <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <SignInForm />
        </CardContent>
        <CardFooter>
          <Link href="/signup">Don&apos;t have an account? Sign up.</Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default SignInPage;
