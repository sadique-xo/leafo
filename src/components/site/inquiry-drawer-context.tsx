"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type InquiryDrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  formKey: number;
  openInquiry: () => void;
  closeInquiry: () => void;
};

const InquiryDrawerContext = createContext<InquiryDrawerContextValue | null>(null);

export function InquiryDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openInquiry = useCallback(() => {
    setFormKey((key) => key + 1);
    setOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, formKey, openInquiry, closeInquiry }),
    [open, formKey, openInquiry, closeInquiry],
  );

  return (
    <InquiryDrawerContext.Provider value={value}>{children}</InquiryDrawerContext.Provider>
  );
}

export function useInquiryDrawer() {
  const ctx = useContext(InquiryDrawerContext);
  if (!ctx) {
    throw new Error("useInquiryDrawer must be used within InquiryDrawerProvider");
  }
  return ctx;
}
