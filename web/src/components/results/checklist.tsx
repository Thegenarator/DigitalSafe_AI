"use client";

import { ChecklistItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  checklist: ChecklistItem[];
  onToggle: (id: string) => void;
};

const categoryColors: Record<string, string> = {
  privacy: "bg-blue-50 border-blue-200 text-blue-800",
  harassment: "bg-purple-50 border-purple-200 text-purple-800",
  data: "bg-green-50 border-green-200 text-green-800",
  footprint: "bg-orange-50 border-orange-200 text-orange-800",
  emotional: "bg-pink-50 border-pink-200 text-pink-800",
};

export function SafetyChecklist({ checklist, onToggle }: Props) {
  if (!checklist.length) return null;

  const completedCount = checklist.filter((item) => item.status === "done").length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/20 p-6 shadow-card/40 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
            Safety Boost To-Do List
          </p>
          <p className="mt-1 text-sm text-ink-600">
            {completedCount} of {checklist.length} completed
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
          {completionPercentage}%
        </div>
      </div>
      
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="space-y-3">
        {checklist.map((item, idx) => {
          const isDone = item.status === "done";
          return (
            <label
              key={item.id}
              className={cn(
                "group flex cursor-pointer items-start gap-4 rounded-2xl border-2 px-5 py-4 text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                isDone
                  ? "border-brand-200 bg-gradient-to-r from-brand-50/50 to-white"
                  : cn(
                      "border-ink-100 bg-white hover:border-brand-200 hover:bg-brand-50/30",
                      categoryColors[item.category] || ""
                    )
              )}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer rounded border-2 border-ink-300 text-brand-600 transition-all duration-300 checked:border-brand-600 checked:bg-brand-600 hover:border-brand-500"
                  checked={isDone}
                  onChange={() => onToggle(item.id)}
                />
                {isDone && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    "font-semibold transition-all duration-300",
                    isDone && "text-ink-500 line-through"
                  )}
                >
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
