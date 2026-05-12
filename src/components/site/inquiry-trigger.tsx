"use client";

import type { ReactNode } from "react";
import { useInquiryDrawer } from "@/components/site/inquiry-drawer-context";

type InquiryTriggerProps = {
  children: ReactNode;
  className?: string;
};

export function InquiryTrigger({ children, className }: InquiryTriggerProps) {
  const { openInquiry } = useInquiryDrawer();

  return (
    <button type="button" className={className} onClick={openInquiry}>
      {children}
    </button>
  );
}
