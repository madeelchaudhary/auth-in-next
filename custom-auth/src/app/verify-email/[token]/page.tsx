import { verifyEntry } from "@/lib/verification";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { token: string };
}

async function MailVeriyPage({ params }: Props) {
  const { token } = params;
  console.log(token, "user token");

  let user;
  let error: string | null = null;
  try {
    user = await verifyEntry(token);
  } catch (error) {
    console.log(error);
    const cause = (error as Error).cause;
    if (cause === "INVALID_TOKEN") {
      return notFound();
    } else if (cause === "TOKEN_EXPIRED") {
      error = "EXPIRED";
    } else if (cause === "ALREADY_VERIFIED") {
      return redirect("/");
    } else {
      error = "UNKNOWN";
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-4xl">Mail Verification</h1>
        {error ? (
          <p>
            {error === "EXPIRED"
              ? "The verification link has expired. Please request a new one."
              : "An error occurred while verifying your email. Please try again."}
          </p>
        ) : (
          <p>Your email has been verified. You can now close this page.</p>
        )}
      </div>
    </main>
  );
}

export default MailVeriyPage;
