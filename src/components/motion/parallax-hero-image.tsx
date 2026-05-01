"use client";

import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

type ParallaxHeroImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Subtle vertical parallax on scroll (scrub) - editorial depth without gimmicks.
 */
export function ParallaxHeroImage({ src, alt, sizes, priority }: ParallaxHeroImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = imgRef.current;
    if (!wrap || !inner || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden bg-[color:var(--surface-strong)]"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 h-[115%] w-full will-change-transform"
        style={{ top: "-7.5%" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
