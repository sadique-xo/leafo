"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  Bot,
  Building2,
  Compass,
  Factory,
  FileText,
  Home,
  MessageCircle,
  Package,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { footer } from "@/data/site-content";
import { cn } from "@/lib/utils";

function dialFromPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

type Mood = "neutral" | "think" | "happy" | "party";

function SproutBotCharacter({ mood, className }: { mood: Mood; className?: string }) {
  const mouth =
    mood === "party"
      ? "M 38 52 Q 48 58 58 52"
      : mood === "happy"
        ? "M 38 52 Q 48 60 58 52"
        : mood === "think"
          ? "M 42 56 L 54 56"
          : "M 40 54 Q 48 58 56 54";

  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 96 120"
        className={cn(
          "w-[4.25rem] h-auto drop-shadow-sm motion-safe:transition-transform motion-safe:duration-[1.4s] motion-safe:ease-in-out",
          mood === "happy" && "motion-safe:-translate-y-0.5",
          mood === "party" && "motion-safe:rotate-[-2deg]",
        )}
      >
        <ellipse cx="48" cy="18" rx="14" ry="22" fill="#2d6a46" opacity="0.92" transform="rotate(-18 48 18)" />
        <ellipse cx="62" cy="20" rx="14" ry="22" fill="#1f5d3a" opacity="0.95" transform="rotate(14 62 20)" />
        <rect x="22" y="38" width="52" height="56" rx="18" fill="url(#botBody)" />
        <circle cx="48" cy="54" r="26" fill="#f0f7f2" />
        <circle cx="40" cy="50" r="5" fill="#1b1c1c" />
        <circle cx="56" cy="50" r="5" fill="#1b1c1c" />
        {mood === "think" ? (
          <path d="M 66 38 Q 72 28 78 34" fill="none" stroke="#1f5d3a" strokeWidth="2.5" strokeLinecap="round" />
        ) : null}
        <path d={mouth} fill="none" stroke="#1b1c1c" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="34" cy="58" rx="4" ry="2.5" fill="#94d4a7" opacity="0.4" />
        <ellipse cx="62" cy="58" rx="4" ry="2.5" fill="#94d4a7" opacity="0.4" />
        <rect x="34" y="92" width="28" height="10" rx="3" fill="#1f5d3a" opacity="0.85" />
        <defs>
          <linearGradient id="botBody" x1="36" y1="38" x2="62" y2="94" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2d6a46" />
            <stop offset="1" stopColor="#1f5d3a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="label-ui mt-1 max-w-[4.5rem] text-center text-[8px] leading-tight tracking-[0.14em] text-[color:var(--primary-ink)]">
        LEAFY
      </span>
    </div>
  );
}

type Step = {
  bot: string;
  options: { label: string; icon: ComponentType<{ className?: string }> }[];
};

const STEPS: Step[] = [
  {
    bot: "Hey! I'm Leafy, part desk plant and part signal boost. What brings you to LEAFO today?",
    options: [
      { label: "I need a quote or specs", icon: FileText },
      { label: "Browsing collections and finishes", icon: Compass },
      { label: "Trade, bulk, or repeat buy", icon: Package },
      { label: "Just exploring for now", icon: Sparkles },
    ],
  },
  {
    bot: "Love it. Who's steering the planter decisions on this project?",
    options: [
      { label: "Architect or interior designer", icon: Building2 },
      { label: "Developer, contractor, or PM", icon: Factory },
      { label: "Homeowner or private space", icon: Home },
      { label: "Hotel, cafe, retail, or F&B", icon: UtensilsCrossed },
    ],
  },
];

function buildWhatsAppHref(answers: string[]): string {
  const dial = dialFromPhone(footer.phone);
  const lines = [
    "Hi LEAFO, I'm messaging from the Leafy guide on your site.",
    "",
    "Here's what I tapped through:",
    ...answers.map((a) => `• ${a}`),
    "",
    "Can we continue here?",
  ];
  const text = lines.join("\n");
  return `https://wa.me/${dial}?text=${encodeURIComponent(text)}`;
}

export function LeafoGuideBot() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const done = stepIndex >= STEPS.length;
  const mood: Mood = done ? "party" : stepIndex === 1 ? "think" : "neutral";

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [open, stepIndex, answers.length]);

  const waHref = useMemo(() => (answers.length === STEPS.length ? buildWhatsAppHref(answers) : "#"), [answers]);

  const pick = (label: string) => {
    setAnswers((prev) => [...prev, label]);
    setStepIndex((i) => i + 1);
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers([]);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-[color:var(--primary)] text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] md:h-auto md:w-auto md:gap-2 md:rounded-none md:border-2 md:border-[color:var(--primary-ink)] md:bg-[color:var(--surface-container-lowest)] md:pl-3 md:pr-4 md:text-[color:var(--charcoal)] md:shadow-[4px_4px_0_0_var(--primary)] md:hover:-translate-y-0.5 md:active:translate-x-0.5 md:active:translate-y-0.5 md:active:scale-100 md:active:shadow-none"
          aria-expanded={false}
          aria-haspopup="dialog"
          aria-label="Chat with Leafy"
        >
          <MessageCircle className="size-5 text-white md:hidden" aria-hidden />
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)] text-white md:flex">
            <MessageCircle className="size-5 text-white" aria-hidden />
          </span>
          <span className="label-ui hidden max-w-[7rem] text-left text-[9px] leading-snug tracking-[0.12em] text-[color:var(--primary-ink)] md:block">
            CHAT WITH LEAFY
          </span>
        </button>
      ) : (
        <div
          className="pointer-events-auto flex max-h-[min(32rem,78dvh)] w-[min(100vw-1.25rem,24rem)] overflow-hidden border border-[color:var(--primary-ink)]/25 bg-[color:var(--surface-container-lowest)] shadow-[6px_6px_0_0_rgba(31,93,58,0.18)]"
          role="dialog"
          aria-modal="false"
          aria-label="Leafy guide, WhatsApp assistant"
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <header className="flex items-center justify-between gap-2 border-b border-border/70 bg-[color:var(--surface)] px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)] text-white">
                  <Bot className="size-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm tracking-tight text-[color:var(--primary-ink)]">Leafy</p>
                  <p className="text-[10px] text-muted-foreground">Try me, it's all taps.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-[color:var(--charcoal)]"
                aria-label="Close guide"
              >
                <X className="size-4" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
            >
              {STEPS.slice(0, stepIndex).map((s, i) => (
                <div key={`turn-${i}`} className="flex flex-col gap-2">
                  <p className="max-w-[95%] rounded-br-md rounded-tr-md border border-border/60 bg-[color:var(--surface)] px-3 py-2 text-xs leading-relaxed text-[color:var(--charcoal)]">
                    {s.bot}
                  </p>
                  <p className="self-end rounded-bl-md rounded-tl-md bg-[color:var(--primary)] px-3 py-2 text-xs font-medium text-white">
                    {answers[i]}
                  </p>
                </div>
              ))}

              {!done ? (
                <div className="flex flex-col gap-2">
                  <p className="max-w-[95%] rounded-br-md rounded-tr-md border border-border/60 bg-[color:var(--surface)] px-3 py-2 text-xs leading-relaxed text-[color:var(--charcoal)]">
                    {STEPS[stepIndex].bot}
                  </p>
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    {STEPS[stepIndex].options.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => pick(opt.label)}
                        className="label-ui flex w-full items-center gap-2 border border-[color:var(--primary-ink)]/20 bg-[color:var(--surface-container-low)] px-3 py-2.5 text-left text-[10px] leading-snug tracking-[0.1em] text-[color:var(--primary-ink)] transition-colors hover:border-[color:var(--primary)] hover:bg-[color:var(--surface)] active:scale-[0.99]"
                      >
                        <opt.icon className="size-3.5 shrink-0 opacity-80" aria-hidden />
                        <span className="min-w-0 flex-1">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="flex items-start gap-2 rounded-br-md rounded-tr-md border border-[color:var(--primary)]/35 bg-[color:var(--surface)] px-3 py-2.5 text-xs leading-relaxed text-[color:var(--charcoal)]">
                    <PartyPopper className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" aria-hidden />
                    <span>
                      {
                        "You're all set. Open WhatsApp and we'll see your choices. The humans pick up from there."
                      }
                    </span>
                  </p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-ui inline-flex h-11 items-center justify-center gap-2 bg-[#25D366] px-4 text-[10px] tracking-[0.14em] text-white transition-opacity hover:opacity-95 active:scale-[0.99]"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    CONTINUE ON WHATSAPP
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className="label-ui text-[9px] tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-[color:var(--primary-ink)] hover:underline"
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="flex min-h-0 w-[4.75rem] shrink-0 flex-col items-center justify-between border-l border-border/60 bg-gradient-to-b from-[#e8f2eb] to-[color:var(--surface-container-low)] py-4">
            <SproutBotCharacter mood={mood} />
            <p className="max-w-[3.5rem] text-center text-[8px] leading-tight text-muted-foreground">
              Fiber-planet liaison
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
