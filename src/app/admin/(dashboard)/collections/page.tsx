import Link from "next/link";
import { listAllCollectionsAdmin } from "@/lib/cms/admin-queries";
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
  title: "Collections (admin)",
};

export default async function AdminCollectionsPage() {
  let rows: Awaited<ReturnType<typeof listAllCollectionsAdmin>> = [];
  let err: string | null = null;
  try {
    rows = await listAllCollectionsAdmin();
  } catch {
    err = "Could not load collections. Check SUPABASE_SERVICE_ROLE_KEY and SQL migrations.";
  }

  if (err) {
    return <p className="text-destructive text-sm">{err}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>
        <Link
          href="/collections"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Preview site
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Slug</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.slug}>
              <TableCell className="font-mono text-xs">{r.slug}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.published ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/admin/collections/${r.slug}/edit`}
                  className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
