"use client";

import { useEffect, useState } from "react";
import { RiskLevel } from "@/lib/types";
import { cn, riskPalette } from "@/lib/utils";

type Props = {
  score: number;
  riskLevel: RiskLevel;
};

export function ScoreDial({ score, riskLevel }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const palette = riskPalette[riskLevel];
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/20 p-8 text-center shadow-card animate-scale-in">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
        Digital Safety Score
      </div>
      <div className="relative mt-6 flex h-56 w-56 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          {/* Background circle */}
          <circle
            className="stroke-ink-100"
            strokeWidth="18"
            cx="112"
            cy="112"
            r="88"
            fill="none"
          />
          {/* Animated progress circle */}
          <circle
            stroke={palette.hex}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            cx="112"
            cy="112"
            r="88"
            fill="none"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${palette.hex}40)`,
            }}
          />
        </svg>
        <div className="flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-ink-900 transition-all duration-300">
            {animatedScore}
          </span>
          <span className="mt-1 text-sm font-medium text-ink-500">out of 100</span>
        </div>
      </div>
      <div
        className={cn(
          "mt-6 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-300",
          palette.bg,
          palette.color
        )}
      >
        {palette.label}
      </div>
      <p className="mt-4 text-xs text-ink-400">
        {score >= 80
          ? "Excellent digital safety practices"
          : score >= 55
          ? "Good foundation with room for improvement"
          : "Important areas need attention"}
      </p>
    </div>
  );
}
