# MyGapMentor

A practical gap-year workspace: discover relevant opportunities, build a realistic plan, track commitments, and keep evidence of your work.

Live website: https://zhandolia.github.io/MyGapMentor/

## What works

- A minimal, search-first front page with 16 stationary quick-search buttons beneath the search bar.
- A consistent, responsive workspace retaining the original blue-and-white identity and logo.
- Three-field setup (subject, age, education stage), with optional preferences; results appear immediately. No profile is needed to browse or save.
- 48 source-reviewed programs, practice resources, and directories across 20 majors, with eligibility, timing, cost, commitment, suggested outputs, and three tailored next steps. Reviewed September 24, 2026.
- Daily hosted imports from MLH and Zooniverse; automatic retirement, stale-source handling, and cached fallbacks. No visitor API key or running laptop is required.
- Multiword search, collapsed advanced filters, timing tabs, progressive result loading, comparisons, and saved checklists with persistent completion.
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

The Vite build goes to `build/` with relative assets and hash routes for both root and project hosting. GitHub Actions tests and builds every push to `main`, then deploys the passing build to GitHub Pages. Pull requests are tested without publishing. Pages uses the GitHub Actions publishing source. No deployment secrets, API keys, paid services, or running local server are required. The connected Vercel project remains available for older links; `vercel.json` preserves its older direct page links.

Moving from Vercel: personal work is stored per website origin. Export your JSON backup from **Profile** on the old site, then import it in **Profile** on GitHub Pages. It will not transfer automatically. The catalog refresh URL is independent of the hosting domain.

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

Matching checks known minimum/maximum ages, explicit school/college requirements, expired event dates, application dates, and preference relevance. Unknown visitors are not assigned a fictional age. Country, citizenship, age-at-deadline exceptions, and event-specific conditions still need an organizer check. Application expiration uses calendar dates; the displayed official time zone and cutoff time remain authoritative. Profile country and free-text notes are personal context, not automated eligibility inputs. The planner deliberately excludes full-time commitments from a part-time schedule and does not invent deadlines. Resources are starting points, not guaranteed placements.

The previous code exposed an API key and tracked an environment file. They have been removed from the current source tree, along with the obsolete OpenAI clients and credential logging. **Revoke any previously published key that is still active.** Git history was not rewritten.

## Maintain the catalog

Edit `src/catalog.js`, `src/catalog-extra.js`, and `src/opportunity-actions.js`. See [research notes](src/RESEARCH.md). Each entry should have a primary source, review date, distinct category, eligibility text, accurate cost/format labels, and a concrete possible output. Never convert an event date into an application deadline. Keep directories distinct from programs, and distinguish simulations, open courses, and research participation from internships or formal credit. Review before each application season.

`src/engine.js` contains matching, scheduling, calendar export, backup validation, and guide logic. The JavaScript and Python tests cover eligibility and enrollment, unknown visitors, application expiration, multiword search, checklist backup compatibility, catalog integrity, time allocation across every major, unsafe imported URLs, and calendar escaping. GitHub Actions runs tests and a production build on pushes and pull requests.

See [PRODUCT.md](PRODUCT.md) for the launch hypothesis, demo flow, and next investment decisions.

## Automatic catalog refresh

[Refresh opportunity feeds](.github/workflows/refresh-catalog.yml) runs daily at 08:23 UTC in GitHub Actions and supports manual dispatch. It reads MLH’s current/next season calendar and the paginated public Zooniverse API. The first import added 80 upcoming MLH events and 75 live, unfinished research projects; counts change with source availability.

The job commits `src/catalog-feed.json` with real check timestamps and source health. The website fetches that public snapshot on opening, returning to the tab, and every 30 minutes while visible. A new frontend deployment is not required for data updates. Failed requests retain the last successful source data and do not advance its successful-refresh timestamp. Listings more than seven days out of date are excluded from active matches. Retired entries are retained for two years; saved entries also carry a validated local snapshot so personal notes survive retirement.

Feed data is validated before publication and in the browser. Source HTML or API schema failures fail the GitHub run instead of silently clearing results. The workflow uses the repository’s built-in token, with repository-content write permission only; no paid API or personal token is stored. GitHub may delay scheduled runs or disable them after extended repository inactivity. Daily snapshot commits record actual update activity, but upstream outages, account changes, or disabled Actions can still require maintenance. The UI shows the last successful dates rather than claiming permanent freshness.

This automates listings, dates, and active/retired status for the two supported sources. It does not automatically rewrite the 48 manually researched programs’ eligibility rules. Those records retain their honest manual review dates, and calendar deadlines continue to expire automatically. New source integrations or material rule changes require a reviewed code/content update.

Sources: [Panoptes public API](https://zooniverse.github.io/panoptes/), [MLH calendar](https://www.mlh.com/seasons/2027/events), [GitHub schedule behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
