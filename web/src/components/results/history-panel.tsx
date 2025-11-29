"use client";

import { AssessmentResult } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  history: AssessmentResult[];
  onSelect: (assessment: AssessmentResult) => void;
};

export function HistoryPanel({ history, onSelect }: Props) {
  if (!history.length) return null;

  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/20 p-6 shadow-card/30 animate-fade-in">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-xl">
          📈
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
            Progress History
          </p>
          <p className="mt-0.5 text-sm text-ink-600">
            Track your safety journey
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {history.slice(0, 5).map((entry, idx) => {
          const previousScore =
            idx < history.length - 1 ? history[idx + 1].score : null;
          const trend =
            previousScore === null
              ? null
              : entry.score > previousScore
              ? "up"
              : entry.score < previousScore
              ? "down"
              : "same";

          return (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="group flex w-full items-center justify-between rounded-2xl border-2 border-ink-100 bg-white px-4 py-3 text-left transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-300 touch-manipulation"
                aria-label={`View assessment from ${formatDate(entry.createdAt)} with score ${entry.score}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink-700">
                      {formatDate(entry.createdAt)}
                    </p>
                    {trend && (
                      <span className="text-xs text-ink-400">
                        {trend === "up" && (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        )}
                        {trend === "down" && (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        {trend === "same" && (
                          <Minus className="h-4 w-4 text-ink-400" />
                        )}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">
                    {entry.persona.label}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-xl font-bold transition-colors",
                      entry.score >= 80
                        ? "text-green-600"
                        : entry.score >= 55
                        ? "text-amber-600"
                        : "text-red-600"
                    )}
                  >
                    {entry.score}
                  </p>
                  <span className="text-xs text-ink-400">/100</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {history.length > 5 && (
        <p className="mt-4 text-center text-xs text-ink-400">
          Showing 5 most recent assessments
        </p>
      )}
    </div>
  );
}
