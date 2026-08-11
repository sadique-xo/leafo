"use client";

import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type FilterKind = "shape" | "finish" | "size";

export type FilterGroup = {
  kind: FilterKind;
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
};

type CollectionsFilterBarProps = {
  groups: FilterGroup[];
  resultCount: number;
  totalCount: number;
  countForOption: (kind: FilterKind, option: string) => number;
  onClearAll: () => void;
};

function OptionRow({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const disabled = count === 0 && !selected;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center justify-between gap-6 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
        selected ? "text-[color:var(--primary-ink)]" : "text-[color:var(--charcoal)]",
        disabled ? "cursor-not-allowed opacity-35" : "hover:bg-[color:var(--surface-strong)]/70",
      )}
    >
      <span className="flex items-center gap-2">
        <Check
          className={cn("size-3.5 shrink-0", selected ? "opacity-100" : "opacity-0")}
          aria-hidden
        />
        {label}
      </span>
      <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
    </button>
  );
}

export function CollectionsFilterBar({
  groups,
  resultCount,
  totalCount,
  countForOption,
  onClearAll,
}: CollectionsFilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const active = groups.filter((group) => group.value);

  return (
    // Deliberately not sticky: the site header is already fixed, and pinning
    // this too stacks two bands of chrome on top of each other.
    <div className="border-y border-[color:var(--border)] bg-[color:var(--background)]">
      <div className="site-container flex h-14 items-center gap-3 md:h-16">
        <div className="hidden items-center gap-2 md:flex">
          {groups.map((group) => (
            <DropdownMenu key={group.kind}>
              <DropdownMenuTrigger
                className={cn(
                  "label-ui inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[10px] transition-colors",
                  group.value
                    ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                    : "border-[color:var(--border)] text-[color:var(--charcoal)] hover:border-[color:var(--primary-ink)]/40",
                )}
              >
                {group.value ?? group.label}
                <ChevronDown className="size-3" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-1.5" align="start">
                <OptionRow
                  label={`All ${group.label.toLowerCase()}s`}
                  count={totalCount}
                  selected={!group.value}
                  onSelect={() => group.onChange(null)}
                />
                {group.options.map((option) => (
                  <OptionRow
                    key={option}
                    label={option}
                    count={countForOption(group.kind, option)}
                    selected={group.value === option}
                    onSelect={() => group.onChange(group.value === option ? null : option)}
                  />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {active.length > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className="label-ui ml-1 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground transition-colors hover:text-[color:var(--primary-ink)]"
            >
              <X className="size-3" aria-hidden />
              Clear
            </button>
          ) : null}
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className="label-ui inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-4 text-[10px] text-[color:var(--charcoal)] md:hidden">
            <SlidersHorizontal className="size-3.5" aria-hidden />
            Filters
            {active.length > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--primary-ink)] px-1 text-[9px] text-white">
                {active.length}
              </span>
            ) : null}
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="max-h-[82dvh] overflow-y-auto rounded-t-2xl bg-[color:var(--background)] pb-8"
          >
            <SheetHeader className="border-b border-[color:var(--border)] px-5 py-4">
              <SheetTitle className="font-display text-lg text-[color:var(--charcoal)]">
                Filter collections
              </SheetTitle>
            </SheetHeader>

            <div className="grid gap-6 px-5">
              {groups.map((group) => (
                <div key={group.kind}>
                  <p className="label-ui text-[10px] tracking-[0.16em] text-muted-foreground">
                    {group.label}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.options.map((option) => {
                      const count = countForOption(group.kind, option);
                      const selected = group.value === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={count === 0 && !selected}
                          aria-pressed={selected}
                          onClick={() => group.onChange(selected ? null : option)}
                          className={cn(
                            "label-ui inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] transition-colors",
                            selected
                              ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                              : "border-[color:var(--border)] text-[color:var(--charcoal)]",
                            count === 0 && !selected && "cursor-not-allowed opacity-35",
                          )}
                        >
                          {option}
                          <span className="text-[9px] opacity-70">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3 border-t border-[color:var(--border)] px-5 pt-5">
              <button
                type="button"
                onClick={onClearAll}
                className="label-ui h-11 flex-1 border border-[color:var(--primary-ink)] text-[10px] text-[color:var(--primary-ink)]"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="label-ui h-11 flex-1 bg-[color:var(--primary)] text-[10px] text-white"
              >
                Show {resultCount}
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-3">
          {active.length > 0 ? (
            <div className="hidden items-center gap-2 lg:flex">
              {active.map((group) => (
                <button
                  key={group.kind}
                  type="button"
                  onClick={() => group.onChange(null)}
                  aria-label={`Remove ${group.label} filter`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface-strong)] px-3 py-1.5 text-xs text-[color:var(--charcoal)] transition-colors hover:bg-[color:var(--surface-strong)]/70"
                >
                  {group.value}
                  <X className="size-3" aria-hidden />
                </button>
              ))}
            </div>
          ) : null}

          <p className="label-ui text-[10px] whitespace-nowrap text-muted-foreground tabular-nums">
            {resultCount === totalCount ? `${totalCount} designs` : `${resultCount} of ${totalCount}`}
          </p>
        </div>
      </div>
    </div>
  );
}
