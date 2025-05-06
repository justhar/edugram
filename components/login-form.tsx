"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent } from "react";
import { login, signIn, signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { set } from "better-auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = React.useState<string | null>(null);
  const [newUser, setNewUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function signUpHandler(
    username: string,
    name: string,
    school: string,
    password: string
  ) {
    await signUp.email({
      email: `${username}@${school}.identifier`,
      password,
      name,
      callbackURL: "/",
    } as any);
  }

  async function loginHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setNewUser(null);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const school = formData.get("school") as string;
    await signIn.email(
      {
        email: `${username}@${school}.identifier`,
        password: password,
        callbackURL: "/",
      },
      {
        onError(ctx: any) {
          setNewUser(
            "looks like you're a new user, or your credentials are wrong. please wait for a moment"
          );
          login(username, password, school).then((data) => {
            if (data.error) {
              setError(data.error);
              setLoading(false);
            } else {
              signUpHandler(username, data.name, school, password);
              setLoading(false);
            }
          });
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={loginHandler}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">edugram</h1>
            <div className="text-center text-sm">
              login with your edunav account
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {error ? (
              <div className="rounded-md border border-destructive bg-destructive/10 p-2 text-destructive">
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              newUser && (
                <div className="rounded-md border border-primary bg-primary/10 p-2 text-primary">
                  <p className="text-sm">{newUser}</p>
                </div>
              )
            )}

            <div className="grid gap-2">
              <Label htmlFor="username" className="font">
                username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="jack"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="school">school</Label>
              <div className="relative">
                <Input
                  id="school"
                  name="school"
                  type="text"
                  placeholder=".edunav.net"
                  className="placeholder:text-right"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-black border-primary" />
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
