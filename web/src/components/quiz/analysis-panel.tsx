export function AnalysisPanel() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-ink-100 bg-gradient-to-br from-white via-brand-50/30 to-white text-center shadow-card animate-fade-in">
      <div className="relative">
        {/* Animated spinner */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-brand-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-600" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
          <div className="absolute inset-2 flex items-center justify-center rounded-full bg-brand-50">
            <span className="text-2xl">🛡️</span>
          </div>
        </div>
        
        {/* Pulsing dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>
      
      <h3 className="mt-8 text-2xl font-semibold text-ink-900 sm:text-3xl">
        Analyzing your safety patterns...
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">
        We blend rule-based scoring with AI insights to surface your Digital
        Safety Score, persona, and a personalized action plan.
      </p>
      
      <div className="mt-8 flex items-center gap-2 text-xs font-medium text-ink-400">
        <span className="h-1 w-1 animate-pulse rounded-full bg-brand-500" />
        <span>This usually takes 3-5 seconds</span>
      </div>
    </div>
  );
}
