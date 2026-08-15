import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { countInquiriesAdmin } from "@/lib/cms/admin-queries";
import { cn } from "@/lib/utils";
import { ExternalLink, HelpCircle, Layers, FolderKanban, Mail } from "lucide-react";

export default async function AdminHomePage() {
  let inquiryCount: number | null = null;
  try {
    inquiryCount = await countInquiriesAdmin();
  } catch {
    inquiryCount = null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Maintain what visitors see on the marketing site:{" "}
          <strong className="font-medium text-foreground">collections</strong>, optional{" "}
          <strong className="font-medium text-foreground">project</strong> gallery entries, and{" "}
          <strong className="font-medium text-foreground">inquiries</strong> submitted from the contact form. Only your
          admin email can access these screens.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Layers className="size-4" aria-hidden />
              <CardTitle className="text-base">Collections</CardTitle>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              List all catalogue series, open any row to edit text fields (summary, sizes, finishes, etc.), toggle{" "}
              <span className="font-medium text-foreground">published</span>, and upload a replacement image to Supabase
              Storage. Public <code className="rounded bg-muted px-1 py-px text-xs">/collections</code> reads from here
              (with JSON fallback if the database is empty).
            </CardDescription>
            <Link
              href="/admin/collections"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-2 w-fit shrink-0")}
            >
              Open collections
            </Link>
          </CardHeader>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Mail className="size-4" aria-hidden />
              <CardTitle className="text-base">Inquiries</CardTitle>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              {inquiryCount !== null ? (
                <>
                  <span className="font-medium text-foreground">{inquiryCount}</span> submission
                  {inquiryCount === 1 ? "" : "s"} from <code className="rounded bg-muted px-1 py-px text-xs">/contact</code>.
                  Open the list to read full messages and reply.
                </>
              ) : (
                <>
                  Load inquiry submissions after applying the <code className="rounded bg-muted px-1 py-px text-xs">inquiries</code>{" "}
                  migration and setting <code className="rounded bg-muted px-1 py-px text-xs">SUPABASE_SERVICE_ROLE_KEY</code>.
                </>
              )}
            </CardDescription>
            <Link
              href="/admin/inquiries"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-2 w-fit shrink-0")}
            >
              Open inquiries
            </Link>
          </CardHeader>
        </Card>

        <Card className="border-border/80 md:col-span-2 xl:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <FolderKanban className="size-4" aria-hidden />
              <CardTitle className="text-base">Projects</CardTitle>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              Create or edit gallery cards for{" "}
              <code className="rounded bg-muted px-1 py-px text-xs">/projects</code>. Set title, slug, summary, optional
              body, sort order, hero image, and published state. Delete a row from the list when you need to remove a
              card.
            </CardDescription>
            <Link
              href="/admin/projects"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-2 w-fit shrink-0")}
            >
              Open projects
            </Link>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-dashed border-border bg-muted/30">
        <CardHeader>
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="size-4" aria-hidden />
            <CardTitle className="text-base font-medium text-foreground">Setup reminders</CardTitle>
          </div>
          <CardDescription className="space-y-3 text-sm leading-relaxed">
            <p>
              <span className="font-medium text-foreground">Admin sign-in</span> uses email and password. Keep{" "}
              <code className="rounded bg-muted px-1 py-px text-xs">ADMIN_EMAIL</code> and{" "}
              <code className="rounded bg-muted px-1 py-px text-xs">ADMIN_PASSWORD</code> in sync with the Auth user
              (<code className="rounded bg-muted px-1 py-px text-xs">npm run setup:admin</code>).
            </p>
            <p>
              Set <code className="rounded bg-muted px-1 py-px text-xs">NEXT_PUBLIC_SITE_URL</code> in production to
              your public origin.
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
              <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
                <ExternalLink className="size-3.5" />
                Preview public site
              </Link>
              <span className="text-xs text-muted-foreground">Sidebar → View live site</span>
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
