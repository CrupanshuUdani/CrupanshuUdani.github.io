# Ideas / deferred items

Findings and options surfaced during an audit (Aug 2026) that weren't part of that pass's scope. Each has a one-line rationale so a future pass can pick them up without re-deriving context.

## Contact form
- GitHub Pages can't run backend code, so any contact form needs a third-party form-relay service. Two reasonable free-tier options:
  - **Formspree** — most popular, free tier (~50 submissions/mo), dashboard, spam filtering.
  - **Web3Forms** — free, no dashboard, just an access key emailed to you; simplest to wire up.
- Either just needs a `<form action="https://...">` pointed at the provider; no code changes to the React app's data model.

## Visitor analytics beyond GoatCounter
- GoatCounter is wired into `client/index.html` and live (site code `crupanshu-github`).
- If GoatCounter's free tier ever becomes limiting, Plausible or Umami Cloud are the next comparable privacy-friendly options (paid).

## Local build tooling is currently broken on this machine
- `npm run build` and `npm run dev` both crash with a native `esbuild` binary segfault (`SIGSEGV`) on this specific machine (Arch Linux, kernel `6.18.41-1-lts`, Node `v26.5.1`). Reproduced with the plain esbuild CLI in isolation (`echo "x" | esbuild --loader=ts`) — not caused by any app code.
- `npm run check` (plain `tsc`, no esbuild) works fine, so type-correctness was verified that way instead.
- This is very likely a kernel/Go-binary compatibility issue specific to this bleeding-edge local setup, not something wrong with the repo — GitHub Actions CI runs on `ubuntu-latest`, a completely different environment, so the deploy workflow should be unaffected.
- **Workaround confirmed working**: run build/dev inside a `node:20` container (matches CI's Node version), which sidesteps the host esbuild binary entirely. See the "Known local-machine issue" section of `CLAUDE.md` for the exact `docker run` invocation. Still worth root-causing the host issue eventually (older Node LTS via nvm/fnm, or an upstream esbuild GitHub issue for this kernel/Node combo), but no longer blocking local iteration.

## Backend/dependency cleanup
GitHub Pages only ever serves `dist/public` (the static Vite build). None of the following run in production, but they're still installed, type-checked, and bundled on every build:
- `server/` — Express, Passport, Passport-Local, express-session, memorystore, Supabase client, `drizzle-orm`/`drizzle-kit`/`drizzle.config.ts`, `better-sqlite3`, `ws`. This is scaffold leftover from a generic full-stack template; none of it is reachable from a static host.
- ~35 unused shadcn `client/src/components/ui/*` files (accordion, alert-dialog, calendar, carousel, chart, command, etc.) — only `toaster.tsx` and `tooltip.tsx` are actually imported by `App.tsx`.
- `framer-motion` and `recharts` — both installed, neither imported anywhere.
- Removing these would shrink `npm install` time, `node_modules` size, and CI build time, and reduce the dependency surface `npm audit` flags. It's a bigger, higher-risk change than the rest of this pass (touches `script/build.ts`, `tsconfig.json`, `vite.config.ts` aliases, and `shared/schema.ts` must keep working since it's the one thing both the static site and the (unused) API route share) — worth doing as its own dedicated pass.

## Design/UX polish
- **Project case-study depth.** Older academic projects (Texas Weather, Bank Marketing, CyberSecurityCourse) have generic one-line descriptions and no screenshots/live links, in contrast to the polished, metrics-driven Experience section.
- **Resume/CV download link** — not currently offered anywhere on the site.

## Notes section automation (once you're publishing)
`portfolio.notes` ships empty and the section stays hidden until it has content. Two ways to populate it later:
1. Add entries by hand to `shared/portfolio.ts` (`{ title, source, href, date }`).
2. Automate it: [`gautamkrishnar/blog-post-workflow`](https://github.com/marketplace/actions/blog-post-workflow) is the standard GitHub Action for this — it polls an RSS feed (Dev.to/Medium/Hashnode/Substack all expose one per-user) on a schedule and can commit the latest posts into the repo for the site to render. Verify the action's current input names at wire-up time rather than trusting anything written here now.
