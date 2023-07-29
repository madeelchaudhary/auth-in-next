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
import { EyeIcon, Loader2, EyeOff } from "lucide-react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .max(255, "Email is too long."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password is too long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { email, password } = values;

    try {
      const result = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (result.status >= 200 && result.status < 300) {
        router.push("/profile");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    {!showPassword && (
                      <EyeIcon
                        onClick={() => setShowPassword(true)}
                        className="absolute right-2 top-2/4 transform -translate-y-2/4 h-4 w-4 cursor-pointer text-slate-700"
                      />
                    )}
                    {showPassword && (
                      <EyeOff
                        onClick={() => setShowPassword(false)}
                        className="absolute right-2 top-2/4 transform -translate-y-2/4 h-4 w-4 cursor-pointer text-slate-700"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="h-auto w-full py-3" type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
