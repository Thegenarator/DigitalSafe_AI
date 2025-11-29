"use client";

import { AssessmentResult } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";

type Props = {
  history: AssessmentResult[];
};

export function ProgressTimeline({ history }: Props) {
  if (history.length < 2) return null;

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/20 p-6 shadow-card/30 animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-xl">
          📊
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
            Progress Timeline
          </p>
          <p className="mt-0.5 text-sm text-ink-600">
            Your safety journey over time
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ink-200" />

        <div className="space-y-6">
          {sortedHistory.map((entry, idx) => {
            const isImproving =
              idx > 0 && entry.score > sortedHistory[idx - 1].score;
            const scoreChange =
              idx > 0
                ? entry.score - sortedHistory[idx - 1].score
                : null;

            return (
              <div
                key={entry.id}
                className="relative flex items-start gap-4 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={`
                  relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md
                  ${
                    entry.score >= 80
                      ? "bg-green-500"
                      : entry.score >= 55
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }
                `}
                >
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {formatDate(entry.createdAt)}
                      </p>
                      <p className="mt-1 text-xs text-ink-500">
                        {entry.persona.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`
                        text-2xl font-bold
                        ${
                          entry.score >= 80
                            ? "text-green-600"
                            : entry.score >= 55
                            ? "text-amber-600"
                            : "text-red-600"
                        }
                      `}
                      >
                        {entry.score}
                      </p>
                      {scoreChange !== null && (
                        <p
                          className={cn(
                            "text-xs font-medium",
                            isImproving ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {isImproving ? "+" : ""}
                          {scoreChange}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

