const BUCKET = "media";

/** Full HTTPS URL or Storage path under `media` bucket. */
export function resolveImageSrc(imageSrc: string | null | undefined): string {
  if (!imageSrc?.trim()) return "";
  const s = imageSrc.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  if (!base) return s;
  const path = s.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function toStoragePath(folder: string, filename: string): string {
  return `${folder.replace(/\/$/, "")}/${filename}`.replace(/^\/+/, "");
}
