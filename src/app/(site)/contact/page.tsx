import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { ImageLicenseJsonLd } from "@/components/seo/image-license-json-ld";
import { ContactInquiryForm } from "@/components/site/contact-inquiry-form";
import { CornerFrame } from "@/components/site/corner-frame";
import { SiteHero } from "@/components/site/site-hero";
import { contact, footer } from "@/data/site-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Inquire - LEAFO",
  description:
    "Tell us about your project. We respond within two business days with options, sizing, and a quote.",
};

export default function ContactPage() {
  return (
    <>
      <ImageLicenseJsonLd images={[{ url: contact.heroImageSrc }]} />
      <SiteHero
        imageSrc={contact.heroImageSrc}
        imageAlt={contact.heroImageAlt}
        eyebrow="Inquire"
        title={contact.title}
        intro={contact.intro}
      />

      <section className="site-container section-space">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="label-ui text-[11px] text-muted-foreground">Contact details</p>
              <div className="relative mt-6">
                <RevealRuleLine className="mb-10" start="top 91%" duration={0.8} />
                <div className="space-y-6 text-sm text-[color:var(--charcoal)]">
                  <div>
                    <p className="label-ui text-[10px] text-muted-foreground">{contact.reachTitle}</p>
                    <p className="mt-2">{footer.phone}</p>
                    <a href={`mailto:${footer.email}`} className="mt-1 block underline underline-offset-4">
                      {footer.email}
                    </a>
                  </div>
                  <div>
                    <p className="label-ui text-[10px] text-muted-foreground">{contact.visitTitle}</p>
                    <p className="mt-2">{footer.location}</p>
                  </div>
                  <div>
                    <p className="label-ui text-[10px] text-muted-foreground">{contact.hoursTitle}</p>
                    <p className="mt-2">{contact.hours}</p>
                  </div>
                  <div>
                    <p className="label-ui text-[10px] text-muted-foreground">{contact.followTitle}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {contact.followLinks.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          className="underline underline-offset-4 transition-opacity hover:opacity-80"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} start="top 85%">
            <CornerFrame
              innerClassName={cn(
                "p-6 md:p-8 lg:p-10",
                "[&>form]:border-t-0 [&>form]:pt-0 [&>div]:border-t-0 [&>div]:pt-0",
              )}
            >
              <ContactInquiryForm
                fields={contact.fields}
                submitLabel={contact.submitLabel}
                thankYouTitle={contact.thankYouTitle}
                thankYouBody={contact.thankYouBody}
              />
            </CornerFrame>
          </Reveal>
        </div>
      </section>
    </>
  );
}
