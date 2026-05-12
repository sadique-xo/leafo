"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MobileNavSheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileNavSheetContext = createContext<MobileNavSheetContextValue | null>(null);

export function MobileNavSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <MobileNavSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileNavSheetContext.Provider>
  );
}

export function useMobileNavSheet() {
  const ctx = useContext(MobileNavSheetContext);
  if (!ctx) {
    throw new Error("useMobileNavSheet must be used within MobileNavSheetProvider");
  }
  return ctx;
}
