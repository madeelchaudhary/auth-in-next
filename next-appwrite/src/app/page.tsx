"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const { state, dispatch } = useUser();
  const router = useRouter();

  function handleAction() {
    if (state.user) {
      router.push("/profile");
    } else {
      router.push("/signin");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 ">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
        <p className="text-lg text-center">
          {state.user?.name}
          {state.user?.email}
        </p>
        <Button onClick={handleAction} size={"lg"}>
          Get Started
        </Button>
      </div>
    </main>
  );
}
