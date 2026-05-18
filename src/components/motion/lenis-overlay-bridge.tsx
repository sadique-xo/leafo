"use client";

import { useEffect } from "react";
import { useInquiryDrawer } from "@/components/site/inquiry-drawer-context";
import { useMobileNavSheet } from "@/components/site/mobile-nav-sheet-context";
import { useLenis } from "./lenis-context";

export function LenisOverlayBridge() {
  const lenis = useLenis();
  const { open: mobileNavOpen } = useMobileNavSheet();
  const { open: inquiryOpen } = useInquiryDrawer();

  useEffect(() => {
    if (!lenis) return;

    if (mobileNavOpen || inquiryOpen) {
      lenis.stop();
      return;
    }

    lenis.start();
  }, [lenis, mobileNavOpen, inquiryOpen]);

  return null;
}
