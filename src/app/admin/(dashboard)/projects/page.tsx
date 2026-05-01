import Link from "next/link";
import { listAllProjectsAdmin } from "@/lib/cms/admin-queries";
import { deleteProjectAction } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
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
  title: "Projects (admin)",
};

export default async function AdminProjectsPage() {
  let rows: Awaited<ReturnType<typeof listAllProjectsAdmin>> = [];
  let err: string | null = null;
  try {
    rows = await listAllProjectsAdmin();
  } catch {
    err = "Could not load projects. Check Supabase configuration.";
  }

  if (err) {
    return <p className="text-destructive text-sm">{err}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Link
          href="/admin/projects/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          New project
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground">
                No projects yet. Create one to replace the empty state on the public Projects page.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.title}</TableCell>
                <TableCell className="font-mono text-xs">{r.slug}</TableCell>
                <TableCell>{r.sort_order}</TableCell>
                <TableCell>{r.published ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link
                    href={`/admin/projects/${r.id}/edit`}
                    className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
                  >
                    Edit
                  </Link>
                  <form action={deleteProjectAction} className="inline">
                    <input type="hidden" name="id" value={r.id} />
                    <Button type="submit" size="sm" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
