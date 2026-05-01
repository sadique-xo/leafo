import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteInquiryAction } from "@/app/admin/actions";
import { getInquiryAdmin } from "@/lib/cms/admin-queries";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Inquiry ${id.slice(0, 8)}… (admin)` };
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function Row({ label, value }: { label: string; value: string }) {
  const display = value.trim() || "-";
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="label-ui text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground whitespace-pre-wrap break-words">{display}</p>
    </div>
  );
}

export default async function AdminInquiryDetailPage({ params }: Props) {
  const { id } = await params;
  let row: Awaited<ReturnType<typeof getInquiryAdmin>> = null;
  try {
    row = await getInquiryAdmin(id);
  } catch {
    /* table missing or config */
  }
  if (!row) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/admin/inquiries" className="text-sm text-muted-foreground underline underline-offset-4">
            ← All inquiries
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">{row.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{formatWhen(row.created_at)}</p>
        </div>
        <form action={deleteInquiryAction} className="shrink-0">
          <input type="hidden" name="id" value={row.id} />
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
        </form>
      </div>

      <div className="max-w-2xl rounded-none border border-border bg-card px-4 py-2 md:px-6">
        <Row label="Email" value={row.email} />
        <Row label="Phone" value={row.phone} />
        <Row label="Company / studio" value={row.company} />
        <Row label="Role" value={row.role} />
        <Row label="City" value={row.city} />
        <Row label="Project type" value={row.project_type} />
        <Row label="Approximate quantity" value={row.quantity} />
        <Row label="Message" value={row.message} />
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${row.email}`} className={cn(buttonVariants({ size: "sm" }))}>
          Reply by email
        </a>
        {row.phone ? (
          <a href={`tel:${row.phone.replace(/\s+/g, "")}`} className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}>
            Call
          </a>
        ) : null}
      </div>
    </div>
  );
}
