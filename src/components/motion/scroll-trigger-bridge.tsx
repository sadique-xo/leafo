"use client";

import { ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollTriggerBridge() {
  const pathname = usePathname();

  useEffect(() => {
    queueMicrotask(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
