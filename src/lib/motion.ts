"use client";

export function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Desktop-only smooth scroll and hero motion — skips Lenis/GSAP hero work on mobile. */
export function desktopMotionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (!motionAllowed()) return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

export const heroMotionAllowed = desktopMotionAllowed;
export const smoothScrollAllowed = desktopMotionAllowed;
