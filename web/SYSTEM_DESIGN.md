# DigiSafe AI — System Design

## Goals
Create an anonymous-first safety coach that:
- Captures a holistic risk snapshot via adaptive questions.
- Uses a transparent scoring model + GPT insights.
- Returns an actionable plan, checklist, and persona guidance.
- Persists history locally while staying deployable on serverless infra.

## Architecture
```
Browser (Next.js App Router, client components)
  ├─ Quiz wizard (Zustand store)
  ├─ Results UI (Score Dial, Plan, Checklist, History)
  └─ LocalStorage (session history)
API Route (/api/analyze, Node runtime)
  ├─ Validation (zod)
  ├─ Rules baseline (scoreResponses + createDefaultAssessment)
  └─ Optional GPT-4o-mini enrichment via OpenAI Responses API
Data Layer
  ├─ Static question bank & persona rules (TS modules)
  └─ Future: Supabase/PostgreSQL for persisted sessions
```

## Key Modules
- `data/questions.ts`: curated 12-question bank with weights + tips.
- `lib/scoring.ts`: normalizes category scores, assigns risk level, and picks a persona.
- `lib/recommendations.ts`: deterministic vulnerabilities, plan, and checklist builder.
- `lib/prompts.ts`: structured prompt for GPT, requesting JSON.
- `api/analyze`: merges rules output with AI copy; falls back gracefully when AI unavailable.

## Personas & Adaptive Flow
- Persona rules map low-scoring categories to archetypes (advocate, student creator, quiet protector, resilient guardian). Preview adjusts live as answers change.
- Adaptive branching is handled via question ordering and copy; future work: conditional follow-up arrays triggered in the UI.

## Trust & Privacy
- Anonymous by default; all state client-side until we add login.
- Clear fallback when AI offline; no hallucinated hotline data (generic instructions only).
- Transparent scoring card surfaces category contributions before submission.

## Deployment Considerations
- Host on Vercel; keep `/api/analyze` in the default Node runtime (OpenAI SDK needs edge polyfills otherwise).
- Add environment variable (`OPENAI_API_KEY`) via platform secrets.
- Introduce monitoring (Vercel Analytics, Sentry) and optional Supabase for persisted sessions/history.

## Future Enhancements
- Multilingual support via `next-intl`.
- Safety chatbot + scenario simulators (LLM + moderation).
- Admin portal for NGOs to update tips and hotline directories.
- Scheduled nudges (email/SMS) when a new assessment or checklist reminder is due.

