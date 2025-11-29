"use client";

type Props = {
  vulnerabilities: string[];
};

export function RiskList({ vulnerabilities }: Props) {
  if (!vulnerabilities.length) return null;

  const severityColors = [
    "from-red-50 to-red-100/50 border-red-200 text-red-800",
    "from-orange-50 to-orange-100/50 border-orange-200 text-orange-800",
    "from-amber-50 to-amber-100/50 border-amber-200 text-amber-800",
  ];

  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-red-50/20 p-6 shadow-card/30 animate-fade-in">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-xl">
          ⚠️
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-red-600">
            Top Vulnerabilities
          </p>
          <p className="mt-0.5 text-sm text-ink-600">
            Areas that need immediate attention
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {vulnerabilities.map((risk, idx) => (
          <li
            key={risk}
            className={`
              animate-slide-up rounded-2xl border-2 bg-gradient-to-r px-5 py-4 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md
              ${severityColors[idx % severityColors.length]}
            `}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/80 text-xs font-bold">
                {idx + 1}
              </span>
              <span className="flex-1 leading-relaxed">{risk}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
