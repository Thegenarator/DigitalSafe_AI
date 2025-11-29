"use client";

import { useEffect, useState } from "react";
import { QUESTION_BANK } from "@/data/questions";
import { cn } from "@/lib/utils";

type Props = {
  currentIndex: number;
  completed: number;
};

export function ProgressHeader({ currentIndex, completed }: Props) {
  const total = QUESTION_BANK.length;
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = Math.round((completed / total) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-r from-white to-brand-50/30 p-6 shadow-card/40 transition-all duration-300 hover:shadow-card/60">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-ink-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          <span>
            Question {currentIndex + 1} / {total}
          </span>
        </div>
        <span className="font-bold text-brand-600">{progress}% complete</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-ink-100 shadow-inner">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 shadow-sm transition-all duration-700 ease-out relative overflow-hidden"
          )}
          style={{ width: `${animatedProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
        <span>Progress</span>
        <span>{completed} of {total} answered</span>
      </div>
    </div>
  );
}
