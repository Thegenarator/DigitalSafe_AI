# DigiSafe AI

Digital Safe AI is a safety intelligence coach built for women and girls navigating online risk. It blends a transparent rules engine with GPT guidance to score digital safety posture, surface threats, and deliver an actionable plan—without requiring an account or sharing data with a server.

Links:

Project Demo: https://digitalsafeai.lovable.app

Pitch Deck: [[Pitch Deck]](https://www.canva.com/design/DAG6EPfSzzI/XJdUiLM3KM1TZntGCGx_cA/edit?utm_content=DAG6EPfSzzI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
---

## Feature Highlights
- **Adaptive assessment** — 12-question quiz with persona previews, swipe gestures, and live category scoring.
- **Hybrid reasoning** — deterministic scoring pipeline with GPT-4o-mini enrichment plus an offline fallback.
- **Results hub** — score dial, persona narrative, risks, safety plan, checklist, and history in one view.
- **Safety Boost checklist** — track completion locally, print/download plans, and review prior assessments.
- **Mobile-first UX** — responsive layout, glassmorphic hero, fixed nav, and accessible animations.

---

## Architecture & Stack
| Layer | Details |
| --- | --- |
| Framework | Next.js 14 (App Router), TypeScript, React Server Components |
| Styling | Tailwind CSS, custom tokens (`brand`, `ink`, `safety`) & utility classes |
| State & Data | Zustand store for quiz responses, localStorage history buffer |
| AI / Logic | `scoreResponses` + OpenAI Responses API (GPT-4o-mini) with JSON schema guardrails |
| Hosting (recommended) | Vercel (zero-config Next.js + Edge/CDN). Netlify & Cloudflare Pages also work. |

---

## Impact

DigitalSafeAI aims to create a digitally safe environment for women and girls, equipping them with knowledge and tools to navigate online spaces confidently and securely.
> **Privacy note:** Quiz answers stay in browser memory. Session history is stored only in `localStorage`; there is no backend persistence.

---
## QA Checklist
- [ ] Complete the quiz and verify the progress header, swipe gestures, and CTA states.
- [ ] Trigger the results view, ensure persona, chart, plan, and checklist render.
- [ ] Disable the `OPENAI_API_KEY` to confirm the deterministic fallback kicks in.
- [ ] Refresh results to confirm history persistence.
- [ ] Validate responsive breakpoints (mobile nav drawer, desktop nav, hero layout).

---

## Roadmap Ideas
- Account & Supabase persistence for multi-device history.
- Localization (EN/FR/SWA) and country-specific hotline directory.
- Optional chatbot, scenario drills, and VOIP safety hotline shortcuts.
- Admin console for NGO/safety teams to curate content.

---

## License & Attribution
Private/for evaluation only. Contact the DigiSafe AI team before distribution or reuse of assets, copy, or data artifacts.
