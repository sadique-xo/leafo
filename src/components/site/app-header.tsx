"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { navigation, contact } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { useHeroOverlay } from "@/components/site/hero-overlay-context";
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

function mobileDrawerLinkClass(active: boolean) {
  return cn(
    "label-ui block border-b border-border/60 py-4 text-[12px] tracking-[0.12em] transition-colors last:border-b-0",
    active ? "text-[color:var(--primary-ink)]" : "text-muted-foreground hover:text-[color:var(--primary-ink)]",
  );
}

const LOGO_GREEN_SRC = "/Leafo_Logo_Green.png";
const LOGO_WHITE_SRC = "/Leafo_Logo_White.png";

export function AppHeader() {
  const pathname = usePathname();
  const { state } = useHeroOverlay();
  const [elevated, setElevated] = useState(false);
  const [solidBar, setSolidBar] = useState(() => pathname !== "/");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryFormKey, setInquiryFormKey] = useState(0);

  const isHome = pathname === "/";
  const navToneLight = Boolean(
    isHome &&
      !solidBar &&
      state &&
      state.slides[state.activeIndex]?.navTone === "light",
  );

  useEffect(() => {
    const onScrollElevated = () => setElevated(window.scrollY > 8);
    onScrollElevated();
    window.addEventListener("scroll", onScrollElevated, { passive: true });
    return () => window.removeEventListener("scroll", onScrollElevated);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setSolidBar(true);
      return;
    }

    const update = () => {
      const vh = window.innerHeight || 800;
      setSolidBar(window.scrollY >= vh * 0.85);
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
    setMobileNavOpen(false);
    setInquiryOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "site-header-bar sticky top-0 z-50 w-full",
        solidBar && elevated && "site-header-bar--elevated",
        !solidBar &&
          (navToneLight ? "site-header-bar--overlay-light" : "site-header-bar--overlay-dark"),
      )}
    >
      <div
        aria-hidden
        className={cn(
          "site-header-bar__backdrop",
          solidBar
            ? "site-header-bar__backdrop--glass"
            : navToneLight
              ? "site-header-bar__backdrop--hero-light"
              : "site-header-bar__backdrop--hero-dark",
        )}
      />
      <div className="site-container relative z-[1] flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="relative z-10 block shrink-0 transition-transform duration-300 active:scale-[0.98]"
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
          className="absolute left-1/2 top-1/2 hidden max-w-[min(100vw-12rem,42rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-x-6 gap-y-2 md:flex lg:gap-x-10"
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

        <button
          type="button"
          className={cn(
            "label-ui relative z-10 hidden shrink-0 px-5 py-2.5 text-[11px] transition-all duration-300 md:inline-flex",
            navToneLight
              ? "border border-white/85 text-white hover:bg-white hover:text-[color:var(--charcoal)] active:scale-[0.97]"
              : "border border-[color:var(--primary-ink)] text-[color:var(--primary-ink)] hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.97]",
          )}
          onClick={() => {
            setInquiryFormKey((k) => k + 1);
            setInquiryOpen(true);
          }}
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
                  "relative z-10 md:hidden",
                  navToneLight
                    ? "text-white hover:bg-white/12 hover:text-white"
                    : "text-[color:var(--primary-ink)] hover:bg-black/[0.06]",
                )}
              />
            }
          >
            <MenuIcon className="size-6" aria-hidden />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex h-full w-[min(100vw-1.5rem,22rem)] flex-col gap-0 border-l border-border/80 bg-[color:var(--surface)] p-0 sm:max-w-sm"
          >
            <SheetHeader className="border-b border-border/60 px-5 py-5 text-left">
              <SheetTitle className="font-display text-lg tracking-tight text-[color:var(--primary-ink)]">
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-1 flex-col overflow-y-auto px-5 pb-4"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={mobileDrawerLinkClass(active)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <SheetFooter className="border-t border-border/60 p-5">
              <button
                type="button"
                className="label-ui inline-flex w-full items-center justify-center border border-[color:var(--primary-ink)] px-5 py-3 text-[11px] text-[color:var(--primary-ink)] transition-all hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]"
                onClick={() => {
                  setMobileNavOpen(false);
                  setInquiryFormKey((k) => k + 1);
                  setInquiryOpen(true);
                }}
              >
                Inquire
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

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
