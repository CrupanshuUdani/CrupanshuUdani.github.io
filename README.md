# Crupanshu Udani Portfolio

Personal GitHub Pages portfolio for Crupanshu Udani, focused on production engineering, SRE, core infrastructure, distributed systems, reliability, automation, projects, skills, education, and certifications.

## Edit portfolio content

`shared/portfolio.ts` holds the home page content (typed by `shared/schema.ts`).

## Writing

Posts are Markdown in `src/content/writing/<slug>.md`. Required frontmatter:

- `title`
- `description` (50–160 chars)
- `pubDate`
- `tier` (`field-note` | `essay` | `til`)

Optional frontmatter: `updated`, `tags`, `draft: true`, `canonicalOverride`.

`/writing/`, the "Writing" nav link, and the home page's "Latest writing" block only appear once a non-draft post exists; `/rss.xml` is always built but has no items until then.

## Commands

```bash
npm run dev              # astro dev
npm run check             # astro check + tsc
npm run build             # static site -> dist/public
npm run verify:writing    # raw-HTML checks on the build
```

If the host's native esbuild misbehaves, run any of the above through `script/docker.sh "<cmd>"` instead (runs in `node:24`, matching CI).

## Deployment

`.github/workflows/ci.yml` runs check → build → verify on every pull request. `.github/workflows/deploy-pages.yml` runs the same steps on push to `main` and publishes `dist/public` to the `gh-pages` branch, served at https://crupanshuudani.com. Never edit `gh-pages` by hand — it's fully regenerated on every `main` push.
