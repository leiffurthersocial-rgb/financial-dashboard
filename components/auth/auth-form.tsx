"use client";

import Link from "next/link";
import { useToast } from "@/components/feedback/toast";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

type Mode = "login" | "signup" | "forgot-password";

const copy: Record<Mode, { title: string; description: string; submit: string }> = {
  login: { title: "Log in", description: "Welcome back.", submit: "Log in" },
  signup: {
    title: "Create account",
    description: "Start with a clear picture of your finances.",
    submit: "Create account",
  },
  "forgot-password": {
    title: "Reset password",
    description: "Enter your email and we'll send a reset link.",
    submit: "Send reset link",
  },
};

/**
 * Auth form UI. Not yet connected: Supabase Auth will be wired in through
 * server actions in the authentication phase. Submitting explains this
 * instead of pretending to succeed.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const { toast } = useToast();
  const { title, description, submit } = copy[mode];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.035em]">{title}</h1>
      <p className="mt-2 text-[15px] text-muted">{description}</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          toast({
            title: "Authentication isn't connected yet",
            description:
              "Supabase Auth will be added in the next phase. Explore the demo dashboard meanwhile.",
          });
        }}
      >
        {mode === "signup" ? (
          <Field label="Full name" name="name" autoComplete="name" required />
        ) : null}
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
        />
        {mode !== "forgot-password" ? (
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={mode === "signup" ? 8 : undefined}
            hint={mode === "signup" ? "At least 8 characters." : undefined}
            labelAction={
              mode === "login" ? (
                <Link
                  href="/forgot-password"
                  className="rounded-control text-xs font-medium text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              ) : undefined
            }
            required
          />
        ) : null}
        <Button type="submit" size="lg" className="w-full">
          {submit}
        </Button>
      </form>

      <p className="mt-8 text-sm text-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/signup" className="font-medium text-fg underline-offset-4 hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            {mode === "signup" ? "Already have an account? " : "Remembered it? "}
            <Link href="/login" className="font-medium text-fg underline-offset-4 hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
