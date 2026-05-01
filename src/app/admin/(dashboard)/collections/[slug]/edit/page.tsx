import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionAdmin } from "@/lib/cms/admin-queries";
import { resolveImageSrc } from "@/lib/cms/resolve-image-src";
import { updateCollectionAction, uploadCollectionImageAction } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Edit ${slug}` };
}

export default async function EditCollectionPage({ params }: Props) {
  const { slug } = await params;
  let row = null;
  try {
    row = await getCollectionAdmin(slug);
  } catch {
    return <p className="text-destructive text-sm">Supabase not configured.</p>;
  }

  if (!row) {
    notFound();
  }

  const previewUrl = resolveImageSrc(row.image_src);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit collection</h1>
          <p className="text-muted-foreground font-mono text-sm">{row.slug}</p>
        </div>
        <Link
          href="/admin/collections"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back
        </Link>
      </div>

      <section className="space-y-3 rounded-lg border border-border p-4">
        <h2 className="text-sm font-medium">Replace image</h2>
        <p className="text-muted-foreground text-xs">
          Uploads go to Storage bucket <code>media</code>. Current preview:
        </p>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="max-h-40 rounded border object-contain" />
        ) : null}
        <form action={uploadCollectionImageAction} className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <input type="hidden" name="slug" value={row.slug} />
          <div className="grow space-y-1">
            <Label htmlFor="file">Image file</Label>
            <Input id="file" type="file" name="file" accept="image/*" required />
          </div>
          <Button type="submit" variant="secondary">
            Upload
          </Button>
        </form>
      </section>

      <form action={updateCollectionAction} className="space-y-6">
        <input type="hidden" name="slug" value={row.slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={row.name} />
          <Field label="Subtitle" name="subtitle" defaultValue={row.subtitle} />
          <Field label="Category" name="category" defaultValue={row.category} />
          <Field label="Material" name="material" defaultValue={row.material} />
          <Field label="Finish line" name="finish" defaultValue={row.finish} className="sm:col-span-2" />
          <Field label="Price note" name="price_note" defaultValue={row.price_note} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" rows={3} defaultValue={row.summary} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sizes">Sizes (one per line)</Label>
          <Textarea
            id="sizes"
            name="sizes"
            rows={6}
            defaultValue={(row.sizes as string[]).join("\n")}
            className="font-mono text-xs"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="story">Story (one paragraph per line)</Label>
          <Textarea
            id="story"
            name="story"
            rows={4}
            defaultValue={(row.story as string[]).join("\n")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Features (one per line)</Label>
          <Textarea
            id="features"
            name="features"
            rows={3}
            defaultValue={(row.features as string[]).join("\n")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_src">Image URL or storage path</Label>
          <Textarea
            id="image_src"
            name="image_src"
            rows={2}
            defaultValue={row.image_src}
            className="font-mono text-xs"
            placeholder="https://... or collections/my-file.jpg"
          />
        </div>

        <Field label="Image alt" name="image_alt" defaultValue={row.image_alt} className="sm:col-span-2" />

        <div className="space-y-2">
          <Label htmlFor="shapes">Shapes (comma-separated)</Label>
          <Input
            id="shapes"
            name="shapes"
            defaultValue={(row.shapes ?? []).join(", ")}
            placeholder="Round, Tall"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="finishes">Finishes filter (comma-separated)</Label>
          <Input
            id="finishes"
            name="finishes"
            defaultValue={(row.finishes ?? []).join(", ")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scale_tags">Scale tags (comma-separated)</Label>
          <Input
            id="scale_tags"
            name="scale_tags"
            defaultValue={(row.scale_tags ?? []).join(", ")}
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
          <Label htmlFor="published">Published on site</Label>
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  defaultValue: string;
  className?: string;
}) {
  return (
    <div className={className ? `space-y-2 ${className}` : "space-y-2"}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue} />
    </div>
  );
}
