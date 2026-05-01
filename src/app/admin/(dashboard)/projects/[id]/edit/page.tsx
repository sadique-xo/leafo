import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectAdmin } from "@/lib/cms/admin-queries";
import { resolveImageSrc } from "@/lib/cms/resolve-image-src";
import { updateProjectAction, uploadProjectImageAction } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  let row = null;
  try {
    row = await getProjectAdmin(id);
  } catch {
    return <p className="text-destructive text-sm">Supabase not configured.</p>;
  }

  if (!row) {
    notFound();
  }

  const preview = resolveImageSrc(row.image_src);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
        <Link
          href="/admin/projects"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back
        </Link>
      </div>

      <section className="space-y-3 rounded-lg border border-border p-4">
        <h2 className="text-sm font-medium">Image</h2>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="max-h-40 rounded border object-contain" />
        ) : null}
        <form action={uploadProjectImageAction} className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <input type="hidden" name="id" value={row.id} />
          <div className="grow space-y-1">
            <Label htmlFor="file">Upload file</Label>
            <Input id="file" name="file" type="file" accept="image/*" required />
          </div>
          <Button type="submit" variant="secondary">
            Upload
          </Button>
        </form>
      </section>

      <form action={updateProjectAction} className="max-w-xl space-y-4">
        <input type="hidden" name="id" value={row.id} />
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={row.slug} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required defaultValue={row.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" rows={3} defaultValue={row.summary} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
          <Textarea id="body" name="body" rows={6} defaultValue={row.body ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_src">Image URL or path</Label>
          <Input id="image_src" name="image_src" defaultValue={row.image_src} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_alt">Image alt</Label>
          <Input id="image_alt" name="image_alt" defaultValue={row.image_alt} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={row.sort_order}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={row.published}
            className="size-4 accent-primary"
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
