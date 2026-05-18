import Link from "next/link";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { footer } from "@/data/site-content";
import { cn } from "@/lib/utils";

const footerLinkClass =
  "leading-normal tracking-[0.01em] text-[color:var(--charcoal)] underline-offset-[3px] transition-opacity duration-300 hover:underline hover:opacity-80";

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:\/\//i.test(href);
  const className = cn("w-fit max-w-full break-words text-sm", footerLinkClass);

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href === "/contact") {
    return <InquiryTrigger className={className}>{children}</InquiryTrigger>;
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-ui mb-[0.65rem] text-[11px] leading-normal text-muted-foreground">{children}</p>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-auto mt-16 w-full shrink-0 rule-section-h bg-[color:var(--surface)]/85">
      <div className="site-container py-14 md:py-16">
        <div
          className={cn(
            "grid grid-cols-1 gap-12 md:grid-cols-3 md:grid-rows-1 md:items-stretch md:gap-x-10 md:gap-y-0 lg:gap-x-14 xl:gap-x-[4.25rem]",
          )}
        >
          {/* Column 1 - brand + legal (fills height; legal sits at bottom) */}
          <div className="flex min-h-0 flex-col md:min-h-full">
            <div>
              <FooterSectionTitle>LEAFO®</FooterSectionTitle>
              <p className="font-display max-w-[22rem] text-pretty text-2xl leading-[1.28] text-[color:var(--charcoal)] sm:max-w-[26rem] md:max-w-none md:text-[1.625rem] md:leading-[1.3] lg:text-[1.75rem] lg:leading-snug xl:text-[1.875rem]">
                {footer.tagline}
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground md:mt-auto md:gap-4 md:pt-6 lg:pt-8 xl:pt-10">
              <p className="max-w-prose text-balance">{footer.note}</p>
              <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2">
                {footer.legalLinks.map((item) => (
                  <FooterNavLink key={item.href} href={item.href}>
                    {item.label}
                  </FooterNavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 2 - Explore | Connect side by side, single row */}
          <div className="min-h-0 min-w-0">
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-10 xl:gap-x-12">
              <nav aria-label="Explore">
                <FooterSectionTitle>Explore</FooterSectionTitle>
                <ul className="flex flex-col gap-[0.375rem]" role="list">
                  {footer.exploreLinks.map((item) => (
                    <li key={item.href}>
                      <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Connect">
                <FooterSectionTitle>Connect</FooterSectionTitle>
                <ul className="flex flex-col gap-[0.375rem]" role="list">
                  {footer.connectLinks.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Column 3 - Reach */}
          <div className="min-w-0 md:self-start">
            <FooterSectionTitle>Reach</FooterSectionTitle>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="tracking-wide text-[color:var(--charcoal)]">{footer.phone}</p>
              <a
                href={`mailto:${footer.email}`}
                className={cn("block w-fit max-w-full break-words", footerLinkClass)}
              >
                {footer.email}
              </a>
              <p className="text-pretty text-muted-foreground">{footer.location}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
