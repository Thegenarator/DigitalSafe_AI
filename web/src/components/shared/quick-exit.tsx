"use client";

import { useCallback } from "react";

type Variant = "nav" | "inline";

type Props = {
  /** Visual style to match different placements */
  variant?: Variant;
};

const PANIC_REDIRECT_URL = "https://www.google.com"; // Neutral destination

export function QuickExitButton({ variant = "nav" }: Props) {
  const handleQuickExit = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        try {
          // Clear all data stored by this app (history, vault, etc.)
          window.localStorage.clear();
          window.sessionStorage.clear();
        } catch {
          // Ignore storage errors – panic should still redirect
        }

        // Replace history so Back button does not easily return to the app
        window.location.replace(PANIC_REDIRECT_URL);
      }
    } catch {
      // As a last resort, try a basic navigation
      if (typeof window !== "undefined") {
        window.location.href = PANIC_REDIRECT_URL;
      }
    }
  }, []);

  const baseClasses =
    "inline-flex items-center justify-center text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300";

  const stylesByVariant: Record<Variant, string> = {
    nav: "rounded-full border border-ink-200/80 bg-white/90 px-3 py-1.5 text-ink-700 hover:bg-ink-50 hover:border-ink-300",
    inline:
      "rounded-full border border-red-200/80 bg-red-50/80 px-3 py-1.5 text-red-700 hover:bg-red-100 hover:border-red-300",
  };

  return (
    <button
      type="button"
      onClick={handleQuickExit}
      className={`${baseClasses} ${stylesByVariant[variant]}`}
      aria-label="Quickly leave DigiSafe AI and go to a neutral site"
    >
      <span className="mr-1.5 text-xs" aria-hidden="true">
        ✕
      </span>
      <span>Quick Exit</span>
    </button>
  );
}


