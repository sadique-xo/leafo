import Link from "next/link";
import { createProjectAction } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "New project (admin)",
};

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
        <Link
          href="/admin/projects"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back
        </Link>
      </div>
      <form action={createProjectAction} className="max-w-xl space-y-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" required placeholder="anand-residence" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body">Body (optional)</Label>
          <Textarea id="body" name="body" rows={6} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_src">Image URL or path</Label>
          <Input id="image_src" name="image_src" placeholder="https://... or projects/file.jpg" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_alt">Image alt</Label>
          <Input id="image_alt" name="image_alt" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input id="sort_order" name="sort_order" type="number" defaultValue={0} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" className="size-4 accent-primary" />
          <Label htmlFor="published">Published</Label>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
