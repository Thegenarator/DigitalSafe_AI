import { PersonaSummary } from "@/lib/types";

type Props = {
  persona: PersonaSummary;
};

export function PersonaPreview({ persona }: Props) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/30 p-5 shadow-card/20 transition-all duration-300 hover:shadow-card/40 animate-fade-in">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-lg">
          👤
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
          Persona Preview
        </p>
      </div>
      <h3 className="text-xl font-semibold text-ink-900">{persona.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">
        {persona.description}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-ink-600">
        {persona.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
