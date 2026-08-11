"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

export type CosmosSpectrumColor =
  | "original"
  | "blue-pink"
  | "blue-orange"
  | "sunset"
  | "purple"
  | "monochrome"
  | "pink-purple"
  | "blue-black"
  | "beige-black";

interface CosmicSpectrumProps {
  color?: CosmosSpectrumColor;
  blur?: boolean;
}

export function CosmicSpectrum({ color = "original", blur = false }: CosmicSpectrumProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const colorThemes: Record<CosmosSpectrumColor, readonly string[]> = {
    /** Deep evergreen → moss → sapling → daylight mist (top fades via last stop opacity 0). */
    original: ["#052e16", "#14532d", "#166534", "#22a355", "#4ade80", "#86efac", "#bbf7d0", "#ecfdf5"],
    "blue-pink": ["#1E3A8A", "#3B82F6", "#A855F7", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8", "#FDF2F8"],
    "blue-orange": ["#1E40AF", "#3B82F6", "#60A5FA", "#FFFFFF", "#FED7AA", "#FB923C", "#EA580C", "#9A3412"],
    sunset: ["#FEF3C7", "#FCD34D", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F", "#451A03"],
    purple: ["#F3E8FF", "#E9D5FF", "#D8B4FE", "#C084FC", "#A855F7", "#9333EA", "#7C3AED", "#6B21B6"],
    monochrome: ["#1A1A1A", "#404040", "#666666", "#999999", "#CCCCCC", "#E5E5E5", "#F5F5F5", "#FFFFFF"],
    "pink-purple": ["#FDF2F8", "#FCE7F3", "#F9A8D4", "#F472B6", "#EC4899", "#BE185D", "#831843", "#500724"],
    "blue-black": ["#000000", "#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8", "#CBD5E1"],
    "beige-black": ["#FEF3C7", "#F59E0B", "#D97706", "#92400E", "#451A03", "#1C1917", "#0C0A09", "#000000"],
  };

  const currentColors = [...colorThemes[color]];

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const animationSection = el.querySelector(".animation-section");
      if (!animationSection) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: animationSection,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const wavelengthLabels = animationSection.querySelectorAll(".wavelength-label");
      const wavelengthList = [...wavelengthLabels];

      if (wavelengthList.length > 0) {
        gsap.set(wavelengthList, {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        });
      }

      const deepNote = el.querySelector(".cosmic-deep-note");
      if (deepNote instanceof HTMLElement) {
        gsap.set(deepNote, {
          autoAlpha: 0,
          y: 28,
          filter: "blur(10px)",
          scale: 0.98,
        });
      }

      const chain = tl
        .to(".svg-container", { opacity: 1, duration: 0.01 }, 0)
        .to(
          ".svg-container",
          {
            transform: "scaleY(0.05) translateY(-30px)",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".svg-container",
          {
            transform: "scaleY(1) translateY(0px)",
            duration: 1.2,
            ease: "power2.out",
          },
          0.3,
        )
        .to(".level-5", { y: "-25vh", duration: 0.8, ease: "power2.out" }, 0.9)
        .to(".level-4", { y: "-20vh", duration: 0.8, ease: "power2.out" }, 0.9)
        .to(".level-3", { y: "-15vh", duration: 0.8, ease: "power2.out" }, 0.9)
        .to(".level-2", { y: "-10vh", duration: 0.8, ease: "power2.out" }, 0.9)
        .to(".level-1", { y: "-5vh", duration: 0.8, ease: "power2.out" }, 0.9);

      if (deepNote instanceof HTMLElement) {
        chain.fromTo(
          deepNote,
          { autoAlpha: 0, y: 28, scale: 0.98, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          0.78,
        );
      }

      if (wavelengthList.length > 0) {
        chain.to(
          wavelengthList,
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            ease: "power2.out",
          },
          0.9,
        );
      }
    }, el);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[color:var(--background)]">
      <div className="animation-section relative min-h-[200svh]">
        <aside className="cosmic-deep-note pointer-events-none fixed inset-x-0 bottom-[min(42svh,24rem)] z-40 mx-auto flex max-w-2xl flex-col items-center px-6 text-center text-white">
          <p className="font-cosmic-script text-balance text-3xl leading-[1.35] md:text-4xl lg:text-[clamp(2rem,4.5vw,2.625rem)]">
            You scrolled like someone who secretly roots for the planet, welcome to moss-level curiosity.
          </p>
        </aside>
        <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-10 h-[min(100vh,900px)] max-h-[100svh]">
          <div
            className="svg-container absolute right-0 bottom-0 left-0 z-[15] h-[min(100vh,900px)] max-h-[100svh] opacity-0"
            style={{
              transformOrigin: "bottom",
              transform: "scaleY(0.05) translateY(100vh)",
              willChange: "transform, opacity, filter",
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 1567 584" preserveAspectRatio="none" fill="none">
              <g clipPath="url(#cosmic_clip)" filter={blur ? "url(#cosmic_blur)" : undefined}>
                <path className="level-2" d="M1219 584H1393V184H1219V584Z" fill="url(#cosmic_grad0)" />
                <path className="level-3" d="M1045 584H1219V104H1045V584Z" fill="url(#cosmic_grad1)" />
                <path className="level-2" d="M348 584H174L174 184H348L348 584Z" fill="url(#cosmic_grad2)" />
                <path className="level-3" d="M522 584H348L348 104H522L522 584Z" fill="url(#cosmic_grad3)" />
                <path className="level-4" d="M697 584H522L522 54H697L697 584Z" fill="url(#cosmic_grad4)" />
                <path className="level-4" d="M870 584H1045V54H870V584Z" fill="url(#cosmic_grad5)" />
                <path className="level-5" d="M870 584H697L697 0H870L870 584Z" fill="url(#cosmic_grad6)" />
                <path className="level-1" d="M174 585H0.000183105L-3.75875e-06 295H174L174 585Z" fill="url(#cosmic_grad7)" />
                <path className="level-1" d="M1393 584H1567V294H1393V584Z" fill="url(#cosmic_grad8)" />
              </g>
              <defs>
                <filter
                  id="cosmic_blur"
                  x="-30"
                  y="-30"
                  width="1627"
                  height="644"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur" />
                </filter>
                {Array.from({ length: 9 }, (_, i) => (
                  <linearGradient
                    key={i}
                    id={`cosmic_grad${i}`}
                    x1="50%"
                    y1="100%"
                    x2="50%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={currentColors[0]} />
                    <stop offset="0.182709" stopColor={currentColors[1]} />
                    <stop offset="0.283673" stopColor={currentColors[2]} />
                    <stop offset="0.413484" stopColor={currentColors[3]} />
                    <stop offset="0.586565" stopColor={currentColors[4]} />
                    <stop offset="0.682722" stopColor={currentColors[5]} />
                    <stop offset="0.802892" stopColor={currentColors[6]} />
                    <stop offset="1" stopColor={currentColors[7]} stopOpacity={0} />
                  </linearGradient>
                ))}
                <clipPath id="cosmic_clip">
                  <rect width="1567" height="584" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
