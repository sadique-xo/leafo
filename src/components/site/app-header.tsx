"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { navigation, contact } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { useHeroOverlay } from "@/components/site/hero-overlay-context";
import { useInquiryDrawer } from "@/components/site/inquiry-drawer-context";
import { useMobileNavSheet } from "@/components/site/mobile-nav-sheet-context";
import { ContactInquiryForm } from "@/components/site/contact-inquiry-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function navLinkClass(active: boolean, heroLight: boolean) {
  return cn(
    "nav-underline label-ui text-[11px] tracking-[0.12em] transition-colors duration-300",
    heroLight
      ? active
        ? "text-white nav-underline--hero-light"
        : "text-white/72 hover:text-white nav-underline--hero-light"
      : active
        ? "text-[color:var(--primary-ink)]"
        : "text-muted-foreground hover:text-[color:var(--primary-ink)]",
  );
}

const LOGO_GREEN_SRC = "/Leafo_Logo_Green.png";
const LOGO_WHITE_SRC = "/Leafo_Logo_White.png";

export function AppHeader() {
  const pathname = usePathname();
  const { state } = useHeroOverlay();
  const [compactChrome, setCompactChrome] = useState(false);
  const { open: mobileNavOpen, setOpen: setMobileNavOpen } = useMobileNavSheet();
  const {
    open: inquiryOpen,
    setOpen: setInquiryOpen,
    formKey: inquiryFormKey,
    openInquiry,
  } = useInquiryDrawer();
  const [hoveredMenuLabel, setHoveredMenuLabel] = useState<string | null>(null);

  const navToneLight = Boolean(
    !compactChrome &&
      state &&
      state.slides[0]?.navTone === "light",
  );

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 800;
      setCompactChrome(window.scrollY >= vh * 0.25);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    const closeOpenDrawers = window.setTimeout(() => {
      setMobileNavOpen(false);
      setInquiryOpen(false);
    }, 0);

    return () => window.clearTimeout(closeOpenDrawers);
  }, [pathname, setInquiryOpen, setMobileNavOpen]);

  return (
    <header
      className="site-header-floating fixed inset-x-0 top-0 z-50 w-full pointer-events-none"
    >
      <div className="site-container relative z-[1] flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className={cn(
            "relative z-10 block shrink-0 transition-all duration-300 active:scale-[0.98] pointer-events-auto",
            compactChrome && "opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          <Image
            src={navToneLight ? LOGO_WHITE_SRC : LOGO_GREEN_SRC}
            alt="LEAFO®"
            width={280}
            height={72}
            className="h-8 w-auto object-contain object-left md:h-10"
            priority
            sizes="(max-width: 768px) 140px, 180px"
          />
        </Link>

        <nav
          className={cn(
            "absolute left-1/2 top-1/2 hidden max-w-[min(100vw-12rem,42rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-x-6 gap-y-2 transition-all duration-300 md:flex lg:gap-x-10 pointer-events-auto",
            compactChrome && "opacity-0 -translate-y-[calc(50%+0.5rem)] pointer-events-none",
          )}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(active, navToneLight)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 pointer-events-auto md:gap-3">
          <button
            type="button"
            className={cn(
              "label-ui shrink-0 rounded-full px-5 py-2.5 text-[11px] transition-all duration-300 active:scale-[0.97]",
              compactChrome ? "inline-flex" : "hidden md:inline-flex",
              navToneLight
                ? "bg-black text-white hover:bg-white hover:text-[color:var(--charcoal)]"
                : "border border-[color:var(--primary-ink)] bg-[color:var(--background)]/88 text-[color:var(--primary-ink)] backdrop-blur-md hover:bg-[color:var(--primary-ink)] hover:text-white",
            )}
            onClick={openInquiry}
          >
            Inquire
          </button>

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn(
                    "relative z-10 rounded-full transition-all duration-300",
                    !compactChrome && "md:hidden",
                    compactChrome && "bg-black text-white hover:bg-black/86 hover:text-white",
                    !compactChrome &&
                      (navToneLight
                        ? "text-white hover:bg-white/12 hover:text-white"
                        : "text-[color:var(--primary-ink)] hover:bg-black/[0.06]"),
                  )}
                />
              }
            >
              <MenuIcon className="size-6" aria-hidden />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="!inset-0 !h-[100dvh] !w-screen !max-w-none gap-0 border-0 bg-[color:var(--background)] p-0 text-[color:var(--charcoal)] data-[side=right]:!inset-0 data-[side=right]:!h-[100dvh] data-[side=right]:!w-screen sm:!max-w-none"
            >
              <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 border-l border-[color:var(--border)]/60 bg-[color:var(--surface-alt)]/45 md:block"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-[8vw] bottom-[-8vw] font-display text-[clamp(8rem,22vw,18rem)] leading-none tracking-[-0.08em] text-[color:var(--primary-ink)]/[0.06]"
                  aria-hidden
                >
                  {hoveredMenuLabel ?? "MENU"}
                </div>

                <SheetHeader className="relative z-10 flex-row items-center justify-between border-b border-[color:var(--border)]/70 px-6 py-5 text-left md:px-10">
                  <SheetTitle className="label-ui text-[11px] tracking-[0.18em] text-[color:var(--primary-ink)]">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <nav
                  className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 md:px-10 lg:px-14"
                  aria-label="Full screen navigation"
                >
                  <div className="grid gap-1 md:gap-2">
                    {navigation.map((item, index) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group relative flex items-baseline gap-4 overflow-hidden border-b border-[color:var(--border)]/70 py-3 transition-colors duration-300 md:gap-6 md:py-4",
                            active
                              ? "text-[color:var(--primary-ink)]"
                              : "text-[color:var(--charcoal)] hover:text-[color:var(--primary-ink)]",
                          )}
                          style={{ transitionDelay: `${index * 45}ms` }}
                          aria-current={active ? "page" : undefined}
                          onMouseEnter={() => setHoveredMenuLabel(item.label)}
                          onFocus={() => setHoveredMenuLabel(item.label)}
                          onMouseLeave={() => setHoveredMenuLabel(null)}
                          onBlur={() => setHoveredMenuLabel(null)}
                          onClick={() => setMobileNavOpen(false)}
                        >
                          <span className="label-ui w-8 shrink-0 text-[10px] text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[clamp(3.25rem,11vw,9rem)] leading-[0.86] tracking-[-0.07em] transition-transform duration-500 motion-safe:group-hover:translate-x-5">
                            {item.label}
                          </span>
                          <span
                            className="absolute bottom-0 left-0 h-[var(--rule-width-strong)] w-full origin-left scale-x-0 bg-[color:var(--primary-ink)] transition-transform duration-500 motion-safe:group-hover:scale-x-100"
                            aria-hidden
                          />
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                <SheetFooter className="relative z-10 border-t border-[color:var(--border)]/70 px-6 py-5 md:px-10">
                  <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                    FRP planters, finishes, and modular systems for homes, hotels, offices,
                    and landscapes.
                  </p>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Sheet open={inquiryOpen} onOpenChange={setInquiryOpen}>
          <SheetContent
            side="right"
            showCloseButton
            className="flex h-full w-[min(100vw-1.5rem,26rem)] flex-col gap-0 border-l border-border/80 bg-[color:var(--surface)] p-0 sm:max-w-md"
          >
            <SheetHeader className="px-5 py-5 pb-4 text-left">
              <SheetTitle className="font-display text-lg tracking-tight text-[color:var(--primary-ink)]">
                {contact.drawerTitle}
              </SheetTitle>
              <SheetDescription className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-0.5 select-none text-base leading-none" aria-hidden>
                  👋
                </span>
                <span>{contact.drawerIntro}</span>
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-2">
              <ContactInquiryForm
                key={inquiryFormKey}
                variant="drawer"
                fields={contact.fields}
                submitLabel={contact.submitLabel}
                thankYouTitle={contact.thankYouTitle}
                thankYouBody={contact.thankYouBody}
              />
            </div>
            <SheetFooter className="border-t border-border/60 px-5 py-4">
              <Link
                href="/contact"
                className="label-ui w-full text-center text-[10px] tracking-[0.12em] text-muted-foreground underline-offset-4 transition-colors hover:text-[color:var(--primary-ink)] hover:underline"
                onClick={() => setInquiryOpen(false)}
              >
                {contact.drawerMoreLabel}
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
