# MyGapMentor

A practical gap-year workspace: discover relevant opportunities, build a realistic plan, track commitments, and keep evidence of your work.

## What works

- A consistent, responsive workspace retaining the original blue-and-white identity and logo.
- Profiles for 20 intended majors; age-aware matching with explanations rather than admissions scores.
- 20 source-reviewed programs, practice resources, and directories, with eligibility notes and explicit event-date labels. Reviewed September 24, 2026.
- Search, major/type/format/free filters, up to three-way comparison, and saved opportunities.
- A 12-week plan with a major-specific independent project, weekly hour budget, editable tasks and dates, and completion tracking.
- An application/activity tracker with status, notes, personal target dates, and calendar export.
- An evidence log with actual hours, reflections, links, and Markdown export.
- Local persistence, validated JSON backup/restore, and explicit reset confirmation.
- A structured mentor guide that works without any API key. An optional local Ollama adapter supports free-form coaching when run on your computer.

## Run

Use Node 22.12+ (the deployment uses Node 22).

```sh
npm ci
npm run dev
npm run test:ci
npm run build
npm run serve
```

`npm run serve` opens a loopback-only production preview at `http://127.0.0.1:4175`. The dev server is for frontend development; use the production preview for the optional AI adapter.

The Vite build goes to `build/`. `vercel.json` preserves older direct page links with a rewrite; hash routes make the app portable to static hosting. The connected Vercel project can deploy from `main`. For GitHub Pages, build with `npm run build -- --base=/MyGapMentor/` and publish the contents of `build/` using Pages. There are no required environment variables.

## Optional local AI — no paid API

1. Install [Ollama](https://ollama.com/download) from its official distribution.
2. Download a local model, for example `ollama pull qwen2.5:3b`.
3. Keep Ollama running on its default loopback address, `127.0.0.1:11434`.
4. Run `npm run build` and `npm run serve`.
5. Open Mentor guide in the local workspace. The additional local-AI form appears only on localhost.

Set `OLLAMA_MODEL` before starting the server to choose a different installed model. The adapter uses Ollama's [chat endpoint](https://docs.ollama.com/api/chat), a fixed loopback URL, an 80-second timeout, a response-size limit, and one concurrent generation. The server validates Host and Origin to avoid exposing the model to arbitrary websites. It sends only the question, major, weekly time budget, and structured guide—not the full profile or evidence log. It does not log prompts or credentials.

This adapter is prepared, but a real model is **not installed or hosted by the public deployment**. Inference requires your own computer/compute and the model's license. The core workspace and mentor guide always work without it. Do not expose this local server publicly; public AI hosting would need authenticated access, abuse controls, and separately provisioned compute.

## Data and limitations

This is a working local-first MVP, not a multi-user service. Data stays in this browser's localStorage. There is no login, cloud sync, billing, counselor service, automatic registration, or notification delivery. Export a backup before changing devices or clearing browser data. The evidence log supports up to 500 records per backup. Do not put sensitive documents in shared browser profiles.

Matching checks known minimum/maximum ages, expired event dates, and preference relevance. Country, citizenship, enrollment, and event-specific conditions must still be checked with the organizer. Profile country and free-text notes are personal context, not automated eligibility inputs. The planner deliberately excludes full-time commitments from a part-time schedule and does not invent deadlines. Resources are starting points, not guaranteed placements.

The previous code exposed an API key and tracked an environment file. They have been removed from the current source tree, along with the obsolete OpenAI clients and credential logging. **Revoke any previously published key that is still active.** Git history was not rewritten.

## Maintain the catalog

Edit `src/catalog.js`. Each entry should have a primary source, review date, distinct category, eligibility text, accurate cost/format labels, and a concrete possible output. Never convert an event date into an application deadline. Keep directories distinct from programs, and distinguish simulations, open courses, and research participation from internships or formal credit. Review before each application season.

`src/engine.js` contains matching, scheduling, calendar export, backup validation, and guide logic. Tests cover eligibility, dates, time allocation across every major, unsafe imported URLs, and calendar escaping. GitHub Actions runs tests and a production build on pushes and pull requests.

See [PRODUCT.md](PRODUCT.md) for the launch hypothesis, demo flow, and next investment decisions.
