"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type HeroSlideNavTone = "dark" | "light";

export type HeroOverlaySlideMeta = {
  navTone: HeroSlideNavTone;
};

type HeroOverlayState = {
  slides: HeroOverlaySlideMeta[];
  activeIndex: number;
};

type HeroOverlayContextValue = {
  state: HeroOverlayState | null;
  setSlides: (slides: HeroOverlaySlideMeta[]) => void;
  setActiveIndex: (index: number) => void;
  clear: () => void;
};

const HeroOverlayContext = createContext<HeroOverlayContextValue | null>(null);

export function HeroOverlayProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HeroOverlayState | null>(null);

  const setSlides = useCallback((slides: HeroOverlaySlideMeta[]) => {
    setState({ slides, activeIndex: 0 });
  }, []);

  const setActiveIndex = useCallback((activeIndex: number) => {
    setState((prev) => (prev ? { ...prev, activeIndex } : null));
  }, []);

  const clear = useCallback(() => setState(null), []);

  const value = useMemo(
    () => ({ state, setSlides, setActiveIndex, clear }),
    [state, setSlides, setActiveIndex, clear],
  );

  return (
    <HeroOverlayContext.Provider value={value}>{children}</HeroOverlayContext.Provider>
  );
}

export function useHeroOverlay() {
  const ctx = useContext(HeroOverlayContext);
  if (!ctx) {
    throw new Error("useHeroOverlay must be used within HeroOverlayProvider");
  }
  return ctx;
}
