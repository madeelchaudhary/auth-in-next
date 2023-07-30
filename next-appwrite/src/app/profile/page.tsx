"use client";
import api from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FetchState } from "@/hooks/user";
import { useUser } from "@/providers/user";
import { useRouter } from "next/navigation";
import React from "react";

function ProfilePage() {
  const { state, dispatch } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    await api.logout();
    dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
  }

  const { user } = state;

  React.useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
      <Card className="py-5 w-3/4 md:w-2/4 lg:w-1/3 max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={handleSignOut} size={"lg"}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfilePage;
