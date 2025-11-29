"use client";

import { useState } from "react";
import { SafetyPlanSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  plan: SafetyPlanSection[];
};

const categoryIcons: Record<string, string> = {
  privacy: "🔒",
  harassment: "🛡️",
  data: "💾",
  footprint: "👣",
  emotional: "💚",
};

export function SafetyPlan({ plan }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleSection = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="space-y-4">
      {plan.map((section, idx) => {
        const isExpanded = expanded[section.category] ?? true;
        return (
          <article
            key={section.category}
            className={cn(
              "group overflow-hidden rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-card/20 transition-all duration-500 hover:border-brand-200 hover:shadow-card/40 animate-fade-in",
              isExpanded && "bg-gradient-to-br from-white to-brand-50/20"
            )}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <header
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleSection(section.category)}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {categoryIcons[section.category] || "📋"}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
                    {section.category}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-ink-900">
                    {section.title}
                  </h3>
                </div>
              </div>
              <button
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600",
                  isExpanded && "rotate-180"
                )}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <span className="text-lg">▼</span>
              </button>
            </header>
            {isExpanded && (
              <div className="mt-6 animate-slide-up">
                <p className="text-sm leading-relaxed text-ink-600">
                  {section.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {section.steps.map((step, stepIdx) => (
                    <li
                      key={step}
                      className="flex gap-4 animate-fade-in"
                      style={{ animationDelay: `${stepIdx * 0.1}s` }}
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                        {stepIdx + 1}
                      </div>
                      <span className="flex-1 text-sm leading-relaxed text-ink-700">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
