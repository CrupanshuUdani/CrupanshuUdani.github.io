# Ideas / deferred items

Findings and options surfaced during an audit (Aug 2026) that weren't part of that pass's scope. Each has a one-line rationale so a future pass can pick them up without re-deriving context.

## Contact form
- GitHub Pages can't run backend code, so any contact form needs a third-party form-relay service. Two reasonable free-tier options:
  - **Formspree** — most popular, free tier (~50 submissions/mo), dashboard, spam filtering.
  - **Web3Forms** — free, no dashboard, just an access key emailed to you; simplest to wire up.
- Either just needs a `<form action="https://...">` pointed at the provider; no code changes to the React app's data model.
- **No email address on the site, by choice (Sep 2026).** The personal Gmail was removed from the hero/footer links and from `profile` (it had also been shipping inside the JS bundle). GitHub and LinkedIn are the contact paths. If email comes back, use a domain alias (e.g. Cloudflare Email Routing `hello@crupanshuudani.com` → inbox), never a personal address. GitHub's `users.noreply.github.com` address can't receive mail, so it isn't an option.

## Visitor analytics beyond GoatCounter
- GoatCounter is wired into `src/layouts/BaseLayout.astro` and live (site code `crupanshu-github`), pinned to `count.v5.js` with an SRI hash.
- If GoatCounter's free tier ever becomes limiting, Plausible or Umami Cloud are the next comparable privacy-friendly options (paid).

## Local build tooling is currently broken on this machine
- `npm run build` and `npm run dev` both crash with a native `esbuild` binary segfault (`SIGSEGV`) on this specific machine (Arch Linux, kernel `6.18.41-1-lts`, Node `v26.5.1`). Reproduced with the plain esbuild CLI in isolation (`echo "x" | esbuild --loader=ts`) — not caused by any app code.
- `npm run check` (plain `tsc`, no esbuild) works fine, so type-correctness was verified that way instead.
- This is very likely a kernel/Go-binary compatibility issue specific to this bleeding-edge local setup, not something wrong with the repo — GitHub Actions CI runs on `ubuntu-latest`, a completely different environment, so the deploy workflow should be unaffected.
- **Workaround confirmed working**: run any npm/node/tsx command through `script/docker.sh "<command>"` (runs inside `node:24`, matching CI), which sidesteps the host esbuild binary entirely. This applies to Astro too — Astro's own toolchain still depends on esbuild, not just the old Vite build. Still worth root-causing the host issue eventually (older Node LTS via nvm/fnm, or an upstream esbuild GitHub issue for this kernel/Node combo), but no longer blocking local iteration.

## Backend/dependency cleanup
GitHub Pages only ever serves `dist/public` (the static Astro build). None of the following run in production, but they're still installed, type-checked, and/or bundled on every build:
- `server/` — Express, Passport, Passport-Local, express-session, memorystore, Supabase client, `drizzle-orm`/`drizzle-kit`/`drizzle.config.ts`, `better-sqlite3`, `ws`. This is scaffold leftover from a generic full-stack template; none of it is reachable from a static host.
- The root `cookie@^2` dependency pin exists only because Express hoists `cookie@0.7` transitively; remove the pin together with Express whenever that cleanup happens.
- **After the Astro migration (Sep 2026), the Vite/React SPA scaffolding is also unused**: root `vite`, `@vitejs/plugin-react`, `wouter`, `@tanstack/react-query`, and the shadcn/Radix `@radix-ui/*` packages (only two of the ~35 generated shadcn components were ever imported, and the components themselves were deleted with `client/` — the npm packages remain).
- `framer-motion` and `recharts` — both installed, neither imported anywhere.
- Removing these would shrink `npm install` time, `node_modules` size, and CI build time, and reduce the dependency surface `npm audit` flags. It's a bigger, higher-risk change than the rest of this pass (touches `package.json`, `script/build.ts`, and `shared/schema.ts` must keep working since it's the one thing both the static site and the (unused) API route share) — worth doing as its own dedicated pass.

## Design/UX polish
- **Project case-study depth.** Older academic projects (Texas Weather, Bank Marketing, CyberSecurityCourse) have generic one-line descriptions and no screenshots/live links, in contrast to the polished, metrics-driven Experience section.
- **Resume/CV download link** — not currently offered anywhere on the site.

## VPS demo box for live project demos
The portfolio itself stays on static hosting permanently — a CDN serves it faster than any single box, with no patching, downtime, or attack surface. A server only earns its place for things that *execute code*: live model endpoints, dashboards, APIs behind project showcases.

- **Scope:** a small VPS behind `demo.<domain>` (or per-project subdomains), never the apex. If it's down or compromised, only the demos break — a recruiter never lands on a dead homepage.
- **Why it's worth doing at all:** for an SRE/MLOps portfolio the box is itself a showcase — Terraform-provisioned, k3s, Grafana/Prometheus, CI/CD deploys, uptime alerting, a written runbook.
- **Cheaper alternatives first:** Cloudflare Workers (free tier) for a tiny API/form handler; Hugging Face Spaces (free CPU tier) for a single model demo. Reach for the VPS only once there's a project that genuinely needs a long-running service.
- **Candidates:** Hetzner, DigitalOcean, or Oracle Cloud's always-free tier. Prices weren't verified when this was written (Sep 2026) — compare current pricing before buying. A true dedicated server is overkill; a VPS demonstrates the same skills.
- Deferred because: no project yet needs a live backend, and running it well (patching, monitoring, backups) is an ongoing cost that should be paid only once there's something to show.
