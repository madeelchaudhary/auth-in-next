"use client";

import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import api from "@/appwrite/config";
import { useUser } from "@/providers/user";
import { FetchState } from "@/hooks/user";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name is too long."),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name is too long."),
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
  newsletter: z.boolean().default(false).optional(),
});

const SignUpForm = () => {
  const { dispatch, state } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const { user } = state;

  React.useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      newsletter: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    dispatch({ type: FetchState.FETCH_INIT });
    const { first_name, last_name, email, password, newsletter } = values;
    try {
      const user = await api.createAccount(
        email,
        password,
        first_name + " " + last_name
      );
      await api.login(email, password);
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: user });
    } catch (error) {
      toast.toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
      dispatch({ type: FetchState.FETCH_FAILURE });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
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
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange as any}
                    />
                  </FormControl>
                  <FormLabel className="m-0">
                    Sign up for our newsletter.
                  </FormLabel>
                </div>
              </FormItem>
            );
          }}
        />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
