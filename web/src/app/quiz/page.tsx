"use client";

import { useEffect, useMemo, useState } from "react";
import { QUESTION_BANK } from "@/data/questions";
import { ProgressHeader } from "@/components/quiz/progress-header";
import { QuestionCard } from "@/components/quiz/question-card";
import { PersonaPreview } from "@/components/quiz/persona-preview";
import { AnalysisPanel } from "@/components/quiz/analysis-panel";
import { ScoreDial } from "@/components/results/score-dial";
import { RiskList } from "@/components/results/risk-list";
import { SafetyPlan } from "@/components/results/safety-plan";
import { SafetyChecklist } from "@/components/results/checklist";
import { HistoryPanel } from "@/components/results/history-panel";
import { PlanDownload } from "@/components/results/plan-download";
import { CategoryChart } from "@/components/results/category-chart";
import { ProgressTimeline } from "@/components/results/progress-timeline";
import { Achievements } from "@/components/shared/achievements";
import { GBVResources } from "@/components/shared/gbv-resources";
import { useQuizStore } from "@/store/useQuizStore";
import { useSwipe } from "@/hooks/useSwipe";
import { scoreResponses } from "@/lib/scoring";
import { AssessmentResult, SelectedAnswer } from "@/lib/types";
import { createDefaultAssessment } from "@/lib/recommendations";
import { cn } from "@/lib/utils";

type Phase = "quiz" | "analysis" | "results";

const HISTORY_KEY = "digisafe-assessments";

export default function QuizPage() {
  const { currentIndex, responses, setResponse, next, back, reset } =
    useQuizStore();
  const [phase, setPhase] = useState<Phase>("quiz");
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Mobile swipe gestures
  const { swipeHandlers } = useSwipe(
    () => {
      // Swipe left = next
      if (phase === "quiz" && !isLastQuestion && responses[currentQuestion.id]) {
        next();
      }
    },
    () => {
      // Swipe right = back
      if (phase === "quiz" && currentIndex > 0) {
        back();
      }
    }
  );

  const previewPayload = useMemo(
    () => scoreResponses(responses),
    [responses]
  );
  const answeredCount = Object.values(responses).filter(Boolean).length;
  const currentQuestion = QUESTION_BANK[currentIndex];
  const isLastQuestion = currentIndex === QUESTION_BANK.length - 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const persistHistory = (entry: AssessmentResult) => {
    if (typeof window === "undefined") return;
    setHistory((prev) => {
      const snapshot = [entry, ...prev].slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(snapshot));
      return snapshot;
    });
  };

  const handleSelect = (option: { label: string; value: string; weight: number; tip: string }) => {
    if (!currentQuestion) return;
    const answer: SelectedAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      label: option.label,
      value: option.value,
      weight: option.weight,
      tip: option.tip,
    };
    setResponse(answer);
    setError(null);
  };

  const handleSubmit = async () => {
    const payload = scoreResponses(responses);
    if (payload.responses.length !== QUESTION_BANK.length) {
      setError("Please answer all questions before generating your plan.");
      return;
    }

    setPhase("analysis");
    setError(null);

    const requestBody = {
      payload,
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Unable to analyze responses.");
      const data = await response.json();
      const finalAssessment: AssessmentResult =
        data.assessment || createDefaultAssessment(payload);

      setAssessment(finalAssessment);
      setPhase("results");
      persistHistory(finalAssessment);
    } catch (err) {
      console.error(err);
      const fallback = createDefaultAssessment(payload);
      setAssessment(fallback);
      setPhase("results");
      persistHistory(fallback);
      setError(
        "AI service is unavailable, so we generated a plan using the core rules engine."
      );
    }
  };

  const handleToggleChecklist = (id: string) => {
    if (!assessment) return;
    const updated: AssessmentResult = {
      ...assessment,
      checklist: assessment.checklist.map((item) =>
        item.id === id
          ? {
              ...item,
              status: (item.status === "done" ? "pending" : "done") as "pending" | "done",
            }
          : item
      ),
    };
    setAssessment(updated);
  };

  const handleDownload = () => {
    window.print();
  };

  const handleHistorySelect = (entry: AssessmentResult) => {
    setAssessment(entry);
    setPhase("results");
  };

  const handleRestart = () => {
    reset();
    setAssessment(null);
    setPhase("quiz");
    setError(null);
  };

  return (
    <main className="min-h-screen px-4 pb-24 pt-24 sm:px-8 sm:pb-12 lg:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-gradient-to-r from-brand-50/90 to-brand-100/50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
            <span>📋</span>
            <span>Safety Assessment</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Answer 12 adaptive questions to unlock your personalized{" "}
            <span className="gradient-text bg-clip-text">Digital Safety Score</span>.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-600">
            Built for anonymous use. Your answers stay on this device unless you
            opt in to save history.
          </p>
        </header>

        {phase === "quiz" && (
          <>
            <ProgressHeader
              currentIndex={currentIndex}
              completed={answeredCount}
            />

            <div
              className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]"
              {...swipeHandlers}
            >
              <QuestionCard
                question={currentQuestion}
                selectedValue={responses[currentQuestion.id]?.value}
                onSelect={handleSelect}
              />
              <div className="space-y-5">
                <PersonaPreview persona={previewPayload.persona} />
                <CategoryChart categoryScores={previewPayload.categoryScores} />
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={currentIndex === 0}
                className={cn(
                  "rounded-full border-2 px-6 py-3 text-sm font-semibold text-ink-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-300",
                  currentIndex === 0
                    ? "cursor-not-allowed border-ink-100 bg-ink-50 text-ink-400"
                    : "border-ink-200 hover:border-brand-300 hover:bg-brand-50 active:scale-95"
                )}
                aria-label="Go to previous question"
              >
                ← Back
              </button>

              {!isLastQuestion && (
                <button
                  type="button"
                  onClick={next}
                  disabled={!responses[currentQuestion.id]}
                  className={cn(
                    "rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-300 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:shadow-none disabled:hover:scale-100"
                  )}
                  aria-label="Go to next question"
                >
                  Next question →
                </button>
              )}

              {isLastQuestion && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={answeredCount !== QUESTION_BANK.length}
                  className={cn(
                    "rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-300 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:shadow-none disabled:hover:scale-100"
                  )}
                  aria-label="Generate personalized safety plan"
                >
                  Generate my safety plan →
                </button>
              )}
            </div>
          </>
        )}

        {phase === "analysis" && <AnalysisPanel />}

        {phase === "results" && assessment && (
          <section className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[0.6fr,1.4fr]">
              <ScoreDial score={assessment.score} riskLevel={assessment.riskLevel} />
              <div className="space-y-4 rounded-3xl border border-ink-100 bg-white/80 p-6 shadow-card/40">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
                  {assessment.persona.label}
                </p>
                <p className="text-lg text-ink-700">{assessment.persona.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-600">
                  {assessment.persona.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <RiskList vulnerabilities={assessment.vulnerabilities} />

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-ink-900">
                Your personalized safety plan
              </h3>
              <SafetyPlan plan={assessment.plan} />
            </div>

            <CategoryChart categoryScores={previewPayload.categoryScores} />

            <div className="grid gap-6 lg:grid-cols-2">
              <SafetyChecklist
                checklist={assessment.checklist}
                onToggle={handleToggleChecklist}
              />
              <HistoryPanel history={history} onSelect={handleHistorySelect} />
            </div>

            {history.length > 1 && (
              <ProgressTimeline history={history} />
            )}

            <Achievements
              assessment={assessment}
              previousScore={
                history.length > 0 ? history[0].score : undefined
              }
            />

            <GBVResources />

            <div className="flex flex-wrap gap-4">
              <PlanDownload onDownload={handleDownload} />
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-200 hover:bg-brand-50 focus:outline-none focus:ring-4 focus:ring-brand-300"
                aria-label="Start a new safety assessment"
              >
                Run again
              </button>
            </div>
          </section>
        )}

        {error && (
          <p className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

