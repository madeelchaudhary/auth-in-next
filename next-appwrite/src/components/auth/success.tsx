import Image from "next/image";
import React from "react";

function SuccessfullSignUp({ email }: { email: string }) {
  return (
    <div className="container max-w-7xl grid gap-8 md:grid-cols-2 items-center mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl mb-2 md:max-w-xs font-semibold ">
          Thank You For Signing Up
        </h1>
        <p className=" text-gray-500 mb-2">{email}</p>
        <p className=" text-gray-500">
          Please check your email for a confirmation link
        </p>
        <div className="text-sm mt-8">
          <p>
            <strong>Note</strong> If you do not receive the email in few minutes
          </p>
          <ul className="list-disc mt-3">
            <li>Check your spam folder</li>
            <li>Check if you entered the correct email</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          width={500}
          height={500}
          src="/images/undraw_Mail_sent_re_0ofv.svg"
          alt="Mail sent"
          className="w-96"
        />
      </div>
    </div>
  );
}

export default SuccessfullSignUp;
