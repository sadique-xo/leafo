"use client";

import { useEffect, useRef } from "react";

type CursorState = {
  x: number;
  y: number;
  dotX: number;
  dotY: number;
  visible: boolean;
};

export function IpadDotCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqFinePointer = window.matchMedia("(pointer: fine)");
    const mqReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mqFinePointer.matches || mqReduceMotion.matches) return;

    const root = document.documentElement;
    root.classList.add("has-ipad-dot-cursor");

    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!ringEl || !dotEl) return;
    const ring = ringEl;
    const dot = dotEl;

    let rafId = 0;

    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const nextState: CursorState = {
      x: pointer.x,
      y: pointer.y,
      dotX: pointer.x,
      dotY: pointer.y,
      visible: false,
    };
    const state: CursorState = { ...nextState };

    function animate() {
      const smoothing = 0.21;
      const dotSmoothing = 0.36;

      state.x += (nextState.x - state.x) * smoothing;
      state.y += (nextState.y - state.y) * smoothing;
      state.dotX += (pointer.x - state.dotX) * dotSmoothing;
      state.dotY += (pointer.y - state.dotY) * dotSmoothing;
      state.visible = nextState.visible;

      ring.style.opacity = state.visible ? "1" : "0";
      ring.style.transform = `translate3d(${state.x - 14}px, ${state.y - 14}px, 0)`;

      dot.style.opacity = state.visible ? "1" : "0";
      dot.style.transform = `translate3d(${state.dotX - 4}px, ${state.dotY - 4}px, 0)`;

      rafId = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      nextState.x = event.clientX;
      nextState.y = event.clientY;
      nextState.visible = true;
    }

    function handlePointerLeave() {
      nextState.visible = false;
    }

    function handlePointerDown() {
      ring.classList.add("ipad-dot-cursor-ring--pressed");
      dot.classList.add("ipad-dot-cursor-dot--pressed");
    }

    function handlePointerUp() {
      ring.classList.remove("ipad-dot-cursor-ring--pressed");
      dot.classList.remove("ipad-dot-cursor-dot--pressed");
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.cancelAnimationFrame(rafId);
      root.classList.remove("has-ipad-dot-cursor");
    };
  }, []);

  return (
    <>
      <div aria-hidden className="ipad-dot-cursor-ring" ref={ringRef} />
      <div aria-hidden className="ipad-dot-cursor-dot" ref={dotRef} />
    </>
  );
}
