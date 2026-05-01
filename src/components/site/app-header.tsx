"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site-content";
import { cn } from "@/lib/utils";

function navLinkClass(active: boolean) {
  return cn(
    "nav-underline label-ui text-[11px] tracking-[0.12em] transition-colors duration-300",
    active ? "text-[color:var(--primary-ink)]" : "text-muted-foreground hover:text-[color:var(--primary-ink)]",
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-header-bar z-50 bg-[color:var(--surface)] transition-[background-color] duration-300",
        elevated && "site-header-bar--elevated",
      )}
    >
      <div className="site-container relative flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="font-display relative z-10 shrink-0 text-xl text-[color:var(--primary-ink)] transition-transform duration-300 active:scale-[0.98] md:text-2xl"
          data-cursor-style="accent"
        >
          LEAFO®
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
                className={navLinkClass(active)}
                aria-current={active ? "page" : undefined}
                data-cursor-style="ghost"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="label-ui relative z-10 hidden shrink-0 border border-[color:var(--primary-ink)] px-5 py-2.5 text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.97] md:inline-flex"
          data-cursor-style="accent"
        >
          Inquire
        </Link>

        <Link
          href="/contact"
          className="label-ui relative z-10 border border-[color:var(--primary-ink)] px-3 py-2 text-[10px] text-[color:var(--primary-ink)] transition-all duration-300 active:scale-[0.97] md:hidden"
          data-cursor-style="accent"
        >
          Inquire
        </Link>
      </div>

      <div className="site-container flex gap-4 overflow-x-auto rule-section-h-soft py-3 md:hidden">
        {navigation.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(active)}
              aria-current={active ? "page" : undefined}
              data-cursor-style="ghost"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
