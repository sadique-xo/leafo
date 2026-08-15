import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export function getAdminEmail() {
  return (process.env.ADMIN_EMAIL ?? "dev.leafo@gmail.com").trim().toLowerCase();
}

export async function getSignedInAdminEmail(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let email = user?.email?.toLowerCase() ?? null;

  // Server Actions can see a stale cookie jar between refresh cycles.
  // Fall back to the persisted session email so allowlisted admins are not locked out.
  if (!email) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    email = session?.user?.email?.toLowerCase() ?? null;
  }

  return email;
}

export async function assertAdmin() {
  const email = await getSignedInAdminEmail();
  if (!email || email !== getAdminEmail()) {
    throw new Error(
      "Unauthorized - stay signed in with the same email as ADMIN_EMAIL in .env.local (no extra spaces).",
    );
  }
}

export async function requireAdminPage() {
  const email = await getSignedInAdminEmail();
  if (!email || email !== getAdminEmail()) {
    redirect("/admin/login");
  }
}
