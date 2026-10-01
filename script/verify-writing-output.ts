// script/verify-writing-output.ts
// Asserts that the built site carries its content and metadata in the RAW HTML.
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot) fetch but do not execute JavaScript,
// so anything only present after hydration is invisible to them. See
// docs/superpowers/specs/2026-09-22-writing-and-tracking-spec.md §2.
//
// The writing section is dormant until the first non-draft post: then there is no
// dist/public/writing/ at all, the RSS feed has no items, and nothing links /writing/.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("dist/public");
const DOMAIN = "crupanshuudani.com";
const failures: string[] = [];

function check(condition: boolean, label: string) {
  if (!condition) failures.push(label);
}

async function read(file: string, label: string): Promise<string | null> {
  try {
    return await readFile(file, "utf-8");
  } catch {
    failures.push(`${label}: file missing at ${path.relative(OUT, file) || file}`);
    return null;
  }
}

async function checkPage(file: string, label: string, opts: { article: boolean }) {
  const html = await read(file, label);
  if (html === null) return null;

  check(/<title>[^<]{10,}<\/title>/.test(html), `${label}: missing or trivial <title>`);
  check(/<meta name="description" content="[^"]{50,}"/.test(html), `${label}: missing meta description (50+ chars)`);
  check(/<link rel="canonical" href="https:\/\//.test(html), `${label}: missing absolute canonical`);
  check(/<meta property="og:title"/.test(html), `${label}: missing og:title`);
  check(/<meta property="og:image" content="https:\/\//.test(html), `${label}: missing absolute og:image`);
  check(/<script type="application\/ld\+json">/.test(html), `${label}: missing JSON-LD`);
  check(/<a[^>]+href="\/[^"]*"/.test(html), `${label}: no internal <a href> links in raw HTML`);
  check(/<link rel="alternate" type="application\/rss\+xml"/.test(html), `${label}: missing RSS autodiscovery link`);

  if (opts.article) {
    check(/"@type":"BlogPosting"/.test(html), `${label}: JSON-LD is not BlogPosting`);
    // Only the rendered markdown counts: page chrome (nav, footer) alone is ~400 chars and
    // would let an empty post pass. The post template renders the body in div.prose-site,
    // the last element inside <article>.
    const bodyHtml = html.match(/<div class="prose-site"[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? "";
    const body = bodyHtml
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    check(body.length >= 100, `${label}: post body text is only ${body.length} chars — the markdown did not render`);
  }
  return html;
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((e) => e.isFile()).map((e) => path.join(e.parentPath, e.name));
}

// Custom domain: without CNAME in the build, GitHub Pages drops crupanshuudani.com on deploy.
const cname = await read(path.join(OUT, "CNAME"), "CNAME");
if (cname !== null) check(cname.trim() === DOMAIN, `CNAME: expected "${DOMAIN}", got "${cname.trim()}"`);

// Home page.
const home = await checkPage(path.join(OUT, "index.html"), "home", { article: false });

// Writing section: active or dormant.
const writingDir = path.join(OUT, "writing");
let slugs: string[] = [];
let active = false;
try {
  slugs = (await readdir(writingDir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);
  active = true;
} catch {
  active = false;
}

// Source/build consistency: every checked-in post source must build exactly one slug.
const SOURCE_DIR = path.resolve("src/content/writing");
let publishedSourceCount = 0;
for (const file of await listFiles(SOURCE_DIR)) {
  if (path.basename(file) === ".gitkeep") continue;
  if (!file.endsWith(".md")) {
    failures.push(`${path.relative(process.cwd(), file)}: unsupported content file (only .md is collected)`);
    continue;
  }
  const contents = await readFile(file, "utf-8");
  const frontmatter = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  if (!/^draft:\s*true\s*$/m.test(frontmatter)) publishedSourceCount++;
}
check(
  publishedSourceCount === slugs.length,
  `writing: ${publishedSourceCount} published source post(s) but ${slugs.length} built`,
);

const rss = await read(path.join(OUT, "rss.xml"), "rss.xml");
const itemCount = rss === null ? 0 : (rss.match(/<item>/g) ?? []).length;
const sitemap = await read(path.join(OUT, "sitemap-0.xml"), "sitemap-0.xml");

if (active) {
  check(slugs.length > 0, "writing/: directory exists but holds no posts");
  await checkPage(path.join(writingDir, "index.html"), "writing index", { article: false });
  for (const slug of slugs) {
    await checkPage(path.join(writingDir, slug, "index.html"), `post:${slug}`, { article: true });
  }
  check(itemCount === slugs.length, `rss.xml: ${itemCount} item(s) for ${slugs.length} post(s)`);
  if (home !== null) check(home.includes('href="/writing/"'), "home: writing is active but nothing links /writing/");
  if (sitemap !== null) check(sitemap.includes(`https://${DOMAIN}/writing/`), "sitemap: writing is active but /writing/ is missing");
} else {
  check(itemCount === 0, `rss.xml: dormant but has ${itemCount} item(s)`);
  if (home !== null) check(!home.includes('href="/writing/"'), "home: dormant but links /writing/ (would 404)");
  if (sitemap !== null) check(!sitemap.includes("/writing/"), "sitemap: dormant but lists /writing/");
}

// Scroll reveal: `.fade-in` starts at opacity 0 and relies on a scroll-driven animation to
// show it. If the CSS minifier folds `animation-timeline` into the `animation` shorthand
// (`animation: … view()`), Chrome drops the whole declaration and the content stays invisible.
for (const file of (await listFiles(OUT)).filter((f) => f.endsWith(".css"))) {
  const css = await readFile(file, "utf-8");
  const name = path.relative(OUT, file);
  check(!/animation:[^;}]*\bview\(/.test(css), `${name}: animation-timeline was folded into the animation shorthand (Chrome rejects it)`);
  if (/\.fade-in\{[^}]*opacity:0/.test(css)) {
    check(/\.fade-in\{[^}]*animation-timeline:view\(\)/.test(css), `${name}: .fade-in hides content but has no animation-timeline to reveal it`);
  }
}

// Privacy: the owner's personal mailbox must stay off the site (removed 2026-09-28).
// Narrowed to personal-mailbox domains so generic addresses in post content
// (e.g. git@github.com) don't false-positive the check.
const EMAIL =
  /[A-Za-z0-9._%+-]+@(?:gmail|googlemail|outlook|hotmail|live|yahoo|icloud|me|proton|protonmail)\.[A-Za-z.]{2,}/gi;
for (const file of await listFiles(OUT)) {
  if (!/\.(html|js|xml|txt)$/.test(file)) continue;
  const found = (await readFile(file, "utf-8")).match(EMAIL);
  check(!found, `${path.relative(OUT, file)}: contains an email address (${found?.[0]})`);
}

if (failures.length > 0) {
  console.error(`verify-writing-output: ${failures.length} failure(s)\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(`verify-writing-output: OK (${active ? `${slugs.length} post(s) checked` : "writing dormant"})`);
