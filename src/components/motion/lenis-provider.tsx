"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleCollectionListScrollRestore } from "@/lib/collection-list-scroll";
import { smoothScrollAllowed } from "@/lib/motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LenisContext } from "./lenis-context";
import { LenisOverlayBridge } from "./lenis-overlay-bridge";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!smoothScrollAllowed()) return;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = instance;
    setLenis(instance);

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    instance.on("scroll", onLenisScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.off("scroll", onLenisScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const restoreScroll = (y: number) => {
      lenisRef.current?.scrollTo(y, { immediate: true });
    };

    const resetScroll = window.requestAnimationFrame(() => {
      if (scheduleCollectionListScrollRestore(pathname, restoreScroll)) {
        ScrollTrigger.refresh();
        return;
      }

      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(resetScroll);
  }, [pathname]);

  return (
    <LenisContext value={lenis}>
      {children}
      <LenisOverlayBridge />
    </LenisContext>
  );
}
