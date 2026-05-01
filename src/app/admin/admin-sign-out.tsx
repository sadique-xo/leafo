"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export function AdminSignOut({ className, variant = "outline", size = "sm" }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (pathname?.startsWith("/admin/login")) return null;

  async function signOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
    setLoading(false);
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={signOut}
      disabled={loading}
    >
      Sign out
    </Button>
  );
}
