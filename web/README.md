# DigiSafe AI

Digital Safe AI is a safety intelligence coach built for women and girls navigating online risk. It blends a transparent rules engine with GPT guidance to score digital safety posture, surface threats, and deliver an actionable plan—without requiring an account or sharing data with a server.

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

## Project Structure
```
web/
├─ src/
│  ├─ app/             # Next.js routes (`/`, `/quiz`, API)
│  ├─ components/      # Shared UI, quiz widgets, result panels
│  ├─ data/            # Quiz question bank & persona metadata
│  ├─ lib/             # Scoring, prompt helpers, type definitions
│  └─ store/           # Zustand quiz store
├─ public/             # Static assets (icons, svgs)
├─ tailwind.config.js  # Theming & tokens
└─ README.md
```

---

## Getting Started
1. **Install dependencies**
   ```bash
   cd web
   npm install
   ```
2. **Configure environment**
   ```
   # web/.env.local
   OPENAI_API_KEY=sk-your-key
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` for the marketing page and `http://localhost:3000/quiz` for the full flow.

> **Privacy note:** Quiz answers stay in browser memory. Session history is stored only in `localStorage`; there is no backend persistence.

---

## Scripts
| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build (includes TypeScript + lint checks) |
| `npm start` | Run production server locally |
| `npm run lint` | ESLint (Next.js config) |

---

## Deployment
1. Push the repository to GitHub/GitLab.
2. Connect the repo to a hosting provider:
   - **Vercel** *(recommended)* for instant Next.js support, preview URLs, and edge acceleration.
   - **Netlify** if you prefer Netlify workflows/functions.
   - **Cloudflare Pages/Workers** for edge-first deployments.
3. Set `OPENAI_API_KEY` in the hosting dashboard.
4. (Optional) Add custom domains, analytics, and image optimization settings per provider.

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
