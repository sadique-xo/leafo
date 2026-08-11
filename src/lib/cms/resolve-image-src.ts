const BUCKET = "media";

/** Full HTTPS URL, root-relative asset in `public/`, or Storage path under the `media` bucket. */
export function resolveImageSrc(imageSrc: string | null | undefined): string {
  if (!imageSrc?.trim()) return "";
  const s = imageSrc.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return s;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  if (!base) return s;
  const path = s.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function toStoragePath(folder: string, filename: string): string {
  return `${folder.replace(/\/$/, "")}/${filename}`.replace(/^\/+/, "");
}
