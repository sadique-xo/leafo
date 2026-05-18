import Image from "next/image";
import type { ProjectItem } from "@/lib/cms/get-projects";

function deriveTags(summary: string, body: string | null): string[] {
  const text = `${summary} ${body ?? ""}`.toLowerCase();
  const tags: string[] = [];
  const add = (t: string) => {
    if (tags.length >= 5) return;
    if (!tags.includes(t)) tags.push(t);
  };
  if (/\bfrp\b|fiber-reinforced|fiber-reinforced plastic/i.test(text)) add("FRP");
  if (/lobby|reception|corporate/i.test(text)) add("Corporate");
  if (/install|on site|installed|delivered/i.test(text)) add("On-site install");
  if (/custom|bespoke|architectural|largest|scale/i.test(text)) add("Custom scale");
  if (/hotel|hospitality|resort/i.test(text)) add("Hospitality");
  if (/landscape|terrace|outdoor|courtyard/i.test(text)) add("Outdoor");
  if (/texture|textured/i.test(text)) add("Texture finish");
  if (/wooden|wood/i.test(text)) add("Wooden finish");
  if (/india|indian/i.test(text)) add("India");
  if (!tags.length) add("Installation");
  return tags;
}

type Props = {
  project: ProjectItem;
  index: number;
};

export function ProjectShowcase({ project, index }: Props) {
  const { title, summary, body, imageSrc, imageAlt } = project;
  const tags = deriveTags(summary, body);
  const textFirst = index % 2 === 1;
  const imageColClass = textFirst ? "lg:order-2" : "lg:order-1";
  const textColClass = textFirst ? "lg:order-1" : "lg:order-2";

  return (
    <article
      className="border-t-[length:var(--rule-width)] border-[color:var(--border)] pt-14 first:border-t-0 first:pt-0 md:pt-16 md:first:pt-0"
      data-stagger-item
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        <figure className={`min-w-0 ${imageColClass}`}>
          {imageSrc ? (
            <div className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-[color:var(--surface-container)] px-4 py-8 md:min-h-[360px] md:px-6 md:py-12">
              <div className="relative h-[min(85vh,920px)] w-full max-w-[min(100%,720px)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority={index === 0}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : null}
          <figcaption className="sr-only">{imageAlt}</figcaption>
        </figure>

        <div className={`flex min-w-0 flex-col lg:pt-2 ${textColClass}`}>
          <p className="label-ui text-[10px] text-muted-foreground">Project</p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project tags">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="label-ui inline-flex border border-[color:var(--border)] bg-[color:var(--surface-container-low)] px-2.5 py-1 text-[9px] tracking-wide text-[color:var(--charcoal)]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-6 text-2xl tracking-tight text-[color:var(--charcoal)] md:text-3xl lg:text-[2rem] lg:leading-[1.2]">
            {title}
          </h2>

          {summary ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--charcoal)] md:text-[1.0625rem] md:leading-[1.65]">
              {summary}
            </p>
          ) : null}

          {body ? (
            <div className="mt-6 max-w-xl border-l border-[color:var(--border)] pl-5 md:border-l-[length:var(--rule-width)] md:pl-6">
              <p className="label-ui text-[10px] text-muted-foreground">Detail</p>
              <p className="mt-3 text-sm leading-[1.72] text-muted-foreground md:text-[0.9375rem]">{body}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
