"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

function Logout() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.status >= 200 && res.status < 300) {
        return router.push("/login");
      }

      throw new Error("Something went wrong.");
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Button onClick={handleLogout} className="mt-10">
      Logout
    </Button>
  );
}

export default Logout;
