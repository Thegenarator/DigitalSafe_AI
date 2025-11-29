"use client";

import { AssessmentResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trophy, Star, Shield, Target } from "lucide-react";
import { useEffect, useState } from "react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  color: string;
};

type Props = {
  assessment: AssessmentResult;
  previousScore?: number;
};

export function Achievements({ assessment, previousScore }: Props) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const allAchievements: Achievement[] = [
    {
      id: "first-scan",
      title: "First Steps",
      description: "Completed your first safety scan",
      icon: Star,
      unlocked: true,
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    {
      id: "high-score",
      title: "Safety Champion",
      description: "Achieved a score of 80 or higher",
      icon: Trophy,
      unlocked: assessment.score >= 80,
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      id: "improvement",
      title: "Making Progress",
      description: "Improved your score from previous scan",
      icon: Target,
      unlocked: previousScore !== undefined && assessment.score > previousScore,
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      id: "complete-checklist",
      title: "Action Taker",
      description: "Complete all checklist items",
      icon: Shield,
      unlocked:
        assessment.checklist.length > 0 &&
        assessment.checklist.every((item) => item.status === "done"),
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const newlyUnlocked = allAchievements.filter(
      (ach) => ach.unlocked && !localStorage.getItem(`achievement-${ach.id}`)
    );

    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked);
      setShowCelebration(true);
      newlyUnlocked.forEach((ach) => {
        localStorage.setItem(`achievement-${ach.id}`, "true");
      });

      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [assessment]);

  const unlockedAchievements = allAchievements.filter((ach) => ach.unlocked);

  if (unlockedAchievements.length === 0) return null;

  return (
    <>
      {/* Celebration Modal */}
      {showCelebration && newAchievements.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm animate-fade-in">
          <div className="mx-4 max-w-md animate-scale-in rounded-3xl border-2 border-brand-200 bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-ink-900">
              Achievement Unlocked!
            </h3>
            {newAchievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={cn(
                    "mt-4 flex items-center gap-3 rounded-2xl border-2 p-4",
                    ach.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-left">
                    <p className="font-semibold">{ach.title}</p>
                    <p className="text-xs opacity-90">{ach.description}</p>
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => setShowCelebration(false)}
              className="mt-6 rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-yellow-50/20 p-6 shadow-card/30 animate-fade-in">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-100 text-xl">
            🏆
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
              Achievements
            </p>
            <p className="mt-0.5 text-sm text-ink-600">
              {unlockedAchievements.length} of {allAchievements.length} unlocked
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {allAchievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-300",
                  ach.unlocked
                    ? `${ach.color} shadow-sm hover:scale-105`
                    : "border-ink-100 bg-ink-50 opacity-50"
                )}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <Icon
                  className={cn(
                    "h-8 w-8",
                    ach.unlocked ? "" : "text-ink-400"
                  )}
                />
                <p className="text-xs font-semibold">{ach.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

