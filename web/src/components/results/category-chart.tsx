"use client";

import { CategoryScores } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  categoryScores: CategoryScores;
};

const categories = [
  { key: "privacy", label: "Privacy", icon: "🔒", color: "bg-blue-500" },
  { key: "harassment", label: "Harassment", icon: "🛡️", color: "bg-purple-500" },
  { key: "data", label: "Data", icon: "💾", color: "bg-green-500" },
  { key: "footprint", label: "Footprint", icon: "👣", color: "bg-orange-500" },
  { key: "emotional", label: "Emotional", icon: "💚", color: "bg-pink-500" },
] as const;

export function CategoryChart({ categoryScores }: Props) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/20 p-6 shadow-card/30 animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-xl">
          📊
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
            Category Breakdown
          </p>
          <p className="mt-0.5 text-sm text-ink-600">
            Your safety score by category
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, idx) => {
          const score = categoryScores[category.key];
          const percentage = Math.round(score);
          
          return (
            <div
              key={category.key}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-semibold text-ink-700">
                    {category.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-ink-900">
                  {percentage}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-ink-100">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
                    category.color
                  )}
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${category.label} safety score: ${percentage}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

