import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import type { LegalDocument } from "@/data/legal-content";

type LegalDocumentPageProps = {
  document: LegalDocument;
  contactPrompt?: string;
};

export function LegalDocumentPage({ document: doc, contactPrompt }: LegalDocumentPageProps) {
  return (
    <>
      <section className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <Reveal className="site-container py-14 md:py-20">
          <p className="label-ui text-[10px] tracking-[0.18em] text-[color:var(--secondary-brand)] md:text-[11px]">
            {doc.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl text-[color:var(--primary-ink)] md:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{doc.intro}</p>
          <p className="label-ui mt-8 text-[10px] tracking-[0.14em] text-muted-foreground md:text-[11px]">
            Last updated {doc.lastUpdated}
          </p>
        </Reveal>
      </section>

      <section className="bg-[color:var(--surface-alt)]">
        <div className="site-container py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            {doc.sections.map((section, index) => (
              <article
                key={section.title}
                className={[
                  "border-t border-[color:var(--border)] py-10 first:border-t-0 first:pt-0 md:py-12",
                  index === doc.sections.length - 1 ? "pb-0" : "",
                ].join(" ")}
              >
                <Reveal>
                  <h2 className="font-display text-xl text-[color:var(--charcoal)] md:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container section-space rule-section-h-soft">
        <Reveal className="border border-[color:var(--border)] bg-[color:var(--surface-strong)]/25 px-6 py-8 md:px-10 md:py-10">
          <RevealRuleLine className="mb-8" start="top 90%" />
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {contactPrompt ?? "Questions about this page?"}{" "}
            <Link href="/contact" className="link-underline-editorial text-[color:var(--charcoal)]">
              Contact us
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
