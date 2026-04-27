# Crupanshu Udani Portfolio

Personal GitHub Pages portfolio for Crupanshu Udani, focused on production engineering, SRE, core infrastructure, distributed systems, reliability, automation, projects, skills, education, and certifications.

## Edit portfolio content

The portfolio is intentionally modular. Most public-facing content lives in:

```text
shared/portfolio.ts
```

To update the site later:

1. Edit `shared/portfolio.ts`.
2. Run `npm run check` to validate types.
3. Run `npm run build` to generate the static site.
4. Push to `main`; GitHub Actions will redeploy GitHub Pages automatically.

## Local development

```bash
npm install
npm run dev
```

## Static build

```bash
npm run check
npm run build
```

The static GitHub Pages artifact is generated in:

```text
dist/public
```

## Deployment

This repository includes `.github/workflows/deploy-pages.yml`, which builds the source on every `main` update and publishes the compiled static files to the `gh-pages` branch. GitHub Pages serves the site from that branch.
