"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .max(255, "Email is too long."),
});

function ResetForm() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { email } = values;

    try {
      const result = await axios.post("/api/auth/reset", {
        email,
      });

      if (result.status >= 200 && result.status < 300) {
        toast.toast({
          title: "Success",
          description: "Please check your email for the reset link.",
        });
      } else {
        const message = result.data.error || "Something went wrong.";
        throw new Error(message);
      }
    } catch (error) {
      console.log(error);
      toast.toast({
        title: (error as Error).message || "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="h-auto w-full py-3" type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Reset"}
        </Button>
      </form>
    </Form>
  );
}

export default ResetForm;
