"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { useEffect, type ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (!motionAllowed()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

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
    };
  }, []);

  return <>{children}</>;
}
