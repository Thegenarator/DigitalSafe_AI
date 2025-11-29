import { AnswerOption, Question } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  question: Question;
  selectedValue?: string;
  onSelect: (option: AnswerOption) => void;
};

export function QuestionCard({ question, selectedValue, onSelect }: Props) {
  return (
    <div className="animate-fade-in rounded-3xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card/80 sm:p-8">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        {question.category}
      </div>
      <h2 className="mt-4 text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
        {question.prompt}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">
        {question.intent}
      </p>

      <div className="mt-8 grid gap-3">
        {question.options.map((option, idx) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(option);
              }
            }}
            className={cn(
              "group relative w-full overflow-hidden rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-md active:scale-[0.98] touch-manipulation",
              "focus:outline-none focus:ring-4 focus:ring-brand-300",
              selectedValue === option.value
                ? "border-brand-400 bg-gradient-to-r from-brand-50 to-brand-100/50 text-brand-900 shadow-md ring-2 ring-brand-200"
                : "border-ink-100 bg-white hover:border-brand-200 hover:bg-brand-50/50"
            )}
            style={{ animationDelay: `${idx * 0.05}s` }}
            aria-pressed={selectedValue === option.value}
            aria-label={`Select option: ${option.label}`}
          >
            {selectedValue === option.value && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                ✓
              </div>
            )}
            <p className="pr-8 text-base font-semibold text-ink-900 group-hover:text-brand-700">
              {option.label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
              {option.tip}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
