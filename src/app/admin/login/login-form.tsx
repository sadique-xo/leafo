"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function getSiteUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function AdminLoginForm() {
  const q = useSearchParams();
  const err = q.get("error");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = getSiteUrl();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/admin`,
        },
      });
      if (error) throw error;
      toast.success("Check your email for the sign-in link.");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      {err === "not_admin" ? (
        <p className="text-destructive text-sm">This account is not authorised for admin access.</p>
      ) : null}
      {err && err !== "not_admin" ? (
        <p className="text-destructive text-sm">{decodeURIComponent(err)}</p>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dev.leafo@gmail.com"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending link…" : "Send magic link"}
      </Button>
    </form>
  );
}
