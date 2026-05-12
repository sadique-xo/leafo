"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { useEffect, useRef, type ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!motionAllowed()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const resetScroll = window.requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(resetScroll);
  }, [pathname]);

  return <>{children}</>;
}
