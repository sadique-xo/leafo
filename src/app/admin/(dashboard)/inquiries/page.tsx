import Link from "next/link";
import { listInquiriesAdmin } from "@/lib/cms/admin-queries";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Inquiries (admin)",
};

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminInquiriesPage() {
  let rows: Awaited<ReturnType<typeof listInquiriesAdmin>> = [];
  let err: string | null = null;
  try {
    rows = await listInquiriesAdmin();
  } catch {
    err =
      "Could not load inquiries. Apply the Supabase migration for `inquiries` and ensure SUPABASE_SERVICE_ROLE_KEY is set.";
  }

  if (err) {
    return <p className="text-destructive text-sm">{err}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Submissions from the public <Link href="/contact" className="underline underline-offset-4">contact form</Link>.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Received</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground">
                No inquiries yet. When visitors submit the form on /contact, rows appear here.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">{formatWhen(r.created_at)}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${r.email}`} className="underline underline-offset-4">
                    {r.email}
                  </a>
                </TableCell>
                <TableCell className="hidden max-w-[12rem] truncate text-muted-foreground md:table-cell">
                  {r.project_type || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/inquiries/${r.id}`} className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}>
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
