import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-container flex flex-col justify-center section-space py-24 md:py-32">
      <h1 className="font-display text-3xl text-[color:var(--charcoal)] md:text-5xl">
        This page has wandered off.
      </h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
        The link you followed may be broken, or the page may have moved. Try the collections, or head home.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/collections"
          className="label-ui inline-flex h-11 items-center border border-[color:var(--primary-ink)] px-8 text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white"
        >
          View collections
        </Link>
        <Link
          href="/"
          className="label-ui inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
