import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";

export const metadata = {
  title: "Admin login",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in with the admin email and password from your environment.
          </p>
        </div>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
