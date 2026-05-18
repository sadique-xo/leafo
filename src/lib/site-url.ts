/** Canonical origin without a trailing slash (from `NEXT_PUBLIC_SITE_URL`). */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/** Build an absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

/**
 * Whether search engines should index this deployment.
 * Override with `NEXT_PUBLIC_ALLOW_INDEXING=true|false`.
 */
export function isIndexableSite(): boolean {
  const override = process.env.NEXT_PUBLIC_ALLOW_INDEXING;
  if (override === "true") return true;
  if (override === "false") return false;

  const url = getSiteUrl();
  if (/localhost|127\.0\.0\.1/i.test(url)) return false;

  return process.env.NODE_ENV === "production";
}
