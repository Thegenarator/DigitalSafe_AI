import Link from "next/link";

const stats = [
  { value: "12", label: "smart questions", icon: "📋" },
  { value: "2 min", label: "to a safety plan", icon: "⏱️" },
  { value: "3", label: "persona insights", icon: "🎯" },
];

const pillars = [
  {
    title: "Assess",
    icon: "🔍",
    body: "Adaptive quiz maps your privacy, harassment, data, footprint, and emotional safety posture.",
    color: "from-brand-500 to-brand-600",
  },
  {
    title: "Understand",
    icon: "💡",
    body: "Transparent scoring explains precisely where risk comes from, with cultural context for African users.",
    color: "from-safety-moderate to-safety-low",
  },
  {
    title: "Act",
    icon: "🛡️",
    body: "AI-crafted plan, Safety Boost checklist, and progress tracker help you build safer digital habits.",
    color: "from-safety-low to-brand-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-24 pt-24 sm:px-6 sm:pb-16 lg:px-10 lg:pt-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        {/* Hero Section */}
        <section className="glass-card relative overflow-hidden px-6 pt-10 pb-12 sm:px-10 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-safety-low/20" />
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-gradient-to-r from-brand-50/90 to-brand-100/50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm backdrop-blur-sm">
              <span className="text-base">🛡️</span>
              <span>DigiSafe AI</span>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div className="space-y-7 animate-slide-up">
                <h1 className="font-display text-4xl leading-[1.1] text-ink-900 sm:text-5xl lg:text-6xl lg:leading-[1.15]">
                  Check your{" "}
                  <span className="gradient-text bg-clip-text">Digital Safety Score</span> in
                  two minutes and get an AI safety coach built for women and girls.
                </h1>
                <p className="text-lg leading-relaxed text-ink-600 sm:text-xl sm:leading-relaxed">
                  DigiSafe AI blends a transparent rules engine with GPT guidance
                  to analyze risk patterns, surface vulnerabilities, and send you
                  a practical plan before abuse escalates.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/quiz"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-300 sm:px-9"
                    aria-label="Start digital safety assessment"
                  >
                    <span>Start my safety scan</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-full border-2 border-brand-200 bg-white px-7 py-4 text-base font-semibold text-brand-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-300 sm:px-9"
                    aria-label="Learn how DigiSafe AI works"
                  >
                    How it works
                  </Link>
                </div>
              </div>
              
              <div className="rounded-3xl border border-white/80 bg-gradient-to-br from-white/95 to-brand-50/40 p-7 shadow-xl backdrop-blur-md animate-scale-in ring-1 ring-black/5">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                  Why it matters
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-700">
                  Digital harassment, impersonation, and blackmail are rising
                  across Africa. Awareness and proactive habits are the strongest
                  defense. Safe people build safer communities.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="group rounded-2xl bg-white/90 p-5 text-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 ring-1 ring-black/5"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="mb-2.5 text-2xl">{stat.icon}</div>
                      <p className="text-2xl font-bold text-brand-600">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="grid gap-6 md:grid-cols-3 lg:gap-8"
        >
          {pillars.map((pillar, idx) => (
            <article
              key={pillar.title}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-card/30 transition-all duration-500 hover:border-brand-200 hover:shadow-card hover:scale-[1.02] ring-1 ring-black/5"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 transition-opacity duration-500 group-hover:opacity-8`}
              />
              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {pillar.body}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Trust Section */}
        <section className="relative overflow-hidden rounded-3xl border border-brand-100/80 bg-gradient-to-br from-brand-50/90 via-white to-safety-low/10 px-8 py-14 text-center shadow-xl sm:px-12 sm:py-20 ring-1 ring-black/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,94,252,0.06),transparent_70%)]" />
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-100 to-brand-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
              <span>🔒</span>
              <span>Built for trust</span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Anonymous-first, culturally grounded, and transparent scoring.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
              No account needed. Your answers stay on your device unless you opt
              in to save history. Every recommendation links to a clear action and
              local hotlines.
            </p>
            <Link
              href="/quiz"
              className="mt-10 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-brand-300 bg-white px-9 py-4.5 font-bold text-brand-700 shadow-md transition-all duration-300 hover:border-brand-400 hover:bg-brand-50 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Run DigiSafe AI</span>
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
        </div>
      </main>
  );
}
