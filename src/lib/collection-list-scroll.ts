"use client";

const STORAGE_KEY = "leafo:collection-list-scroll";
const RESTORE_MAX_ATTEMPTS = 24;

export type CollectionListScrollState = {
  returnPath: string;
  slug: string;
  pageScrollY: number;
  railScrollLeft?: number;
};

function readState(): CollectionListScrollState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CollectionListScrollState;
  } catch {
    return null;
  }
}

export function saveCollectionListScroll(state: CollectionListScrollState) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

export function peekCollectionListScroll(returnPath: string): CollectionListScrollState | null {
  const state = readState();
  return state?.returnPath === returnPath ? state : null;
}

export function consumeCollectionListScroll(returnPath: string): CollectionListScrollState | null {
  const state = peekCollectionListScroll(returnPath);
  if (!state) return null;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }

  return state;
}

function isCardTargetReady(state: CollectionListScrollState): boolean {
  if (state.returnPath === "/") {
    const rail = document.querySelector("[data-collections-rail]");
    if (!rail) return false;
    return Boolean(rail.querySelector(`[data-collection-slug="${state.slug}"]`));
  }

  if (state.returnPath === "/collections") {
    return Boolean(document.querySelector(`[data-collection-card="${state.slug}"]`));
  }

  return true;
}

function restoreCardScroll(state: CollectionListScrollState) {
  if (state.returnPath === "/") {
    const rail = document.querySelector<HTMLElement>("[data-collections-rail]");
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>(`[data-collection-slug="${state.slug}"]`);
    if (card) {
      card.scrollIntoView({ inline: "start", block: "nearest", behavior: "instant" });
      rail.dispatchEvent(new Event("scroll", { bubbles: true }));
      return;
    }

    if (state.railScrollLeft != null) {
      rail.scrollLeft = state.railScrollLeft;
    }

    rail.dispatchEvent(new Event("scroll", { bubbles: true }));
    return;
  }

  const card = document.querySelector<HTMLElement>(`[data-collection-card="${state.slug}"]`);
  card?.scrollIntoView({ block: "center", behavior: "instant" });
}

export function scheduleCollectionListScrollRestore(
  returnPath: string,
  lenisScrollTo: ((y: number) => void) | null,
): boolean {
  const pending = peekCollectionListScroll(returnPath);
  if (!pending) return false;

  lenisScrollTo?.(pending.pageScrollY);
  window.scrollTo(0, pending.pageScrollY);

  const tryRestoreCard = (attemptsLeft: number) => {
    const state = peekCollectionListScroll(returnPath);
    if (!state) return;

    if (!isCardTargetReady(state)) {
      if (attemptsLeft > 0) {
        requestAnimationFrame(() => tryRestoreCard(attemptsLeft - 1));
      } else {
        consumeCollectionListScroll(returnPath);
      }
      return;
    }

    restoreCardScroll(state);
    consumeCollectionListScroll(returnPath);
  };

  requestAnimationFrame(() => tryRestoreCard(RESTORE_MAX_ATTEMPTS));
  return true;
}
