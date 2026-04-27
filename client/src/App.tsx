import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  Server,
  Sparkles,
  Sun,
  TerminalSquare,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import type { Certification, Experience, Link, Portfolio, Project, SkillGroup } from "@shared/schema";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";

function usePortfolio() {
  return useQuery<Portfolio>({
    queryKey: ["/api/portfolio"],
  });
}

function openExternal(link: string) {
  window.open(link, "_blank", "noopener,noreferrer");
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo() {
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <svg
        aria-label="Crupanshu Udani portfolio mark"
        className="h-11 w-11 text-primary"
        fill="none"
        viewBox="0 0 48 48"
      >
        <rect width="42" height="42" x="3" y="3" rx="12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M17 16c-4 0-7 3.1-7 8s3 8 7 8c2.8 0 5-1.1 6.4-3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
        <path d="M27 15v10.2c0 4.2 2.3 6.8 6 6.8s6-2.6 6-6.8V15" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="2.2" fill="currentColor" />
        <path d="M24 24h8M24 24l-6-5M24 24l-6 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
      <div>
        <p className="font-display text-base font-bold leading-tight">Crupanshu Udani</p>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Core Infra</p>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = prefersDark ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs hover-elevate active-elevate-2"
      data-testid="button-theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function Header({ portfolio }: { portfolio: Portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = portfolio.navigation;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          className="text-left"
          data-testid="button-scroll-home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          <Logo />
        </button>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <button
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              data-testid={`button-nav-${item.label.toLowerCase()}`}
              key={item.href}
              onClick={() => scrollToHash(item.href)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden"
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden" data-testid="nav-mobile">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map((item) => (
              <button
                className="rounded-md px-3 py-3 text-left text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                data-testid={`button-mobile-nav-${item.label.toLowerCase()}`}
                key={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToHash(item.href);
                }}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function ExternalLinkButton({ link, primary = false }: { link: Link; primary?: boolean }) {
  return (
    <button
      className={
        primary
          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm hover-elevate active-elevate-2"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover-elevate active-elevate-2"
      }
      data-testid={`button-link-${link.label.toLowerCase()}`}
      onClick={() => (link.href.startsWith("mailto:") ? (window.location.href = link.href) : openExternal(link.href))}
      type="button"
    >
      {link.label}
      <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}

function Hero({ portfolio }: { portfolio: Portfolio }) {
  const { profile, metrics } = portfolio;
  const primaryLinks = profile.links;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 control-grid opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.20),transparent_34%),radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.18),transparent_30%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-bold text-muted-foreground shadow-xs backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {profile.availability}
          </div>
          <h1 className="font-display max-w-4xl text-balance text-5xl font-extrabold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl" data-testid="text-hero-headline">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground" data-testid="text-hero-summary">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryLinks.map((link, index) => (
              <ExternalLinkButton key={link.href} link={link} primary={index === 0} />
            ))}
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {metrics.slice(0, 3).map((metric) => (
              <div className="rounded-md border border-border bg-card/80 p-4 shadow-xs backdrop-blur" data-testid={`card-hero-metric-${metric.label}`} key={metric.label}>
                <p className="font-display text-3xl font-extrabold tracking-tight text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="panel overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-card-border bg-secondary/60 px-5 py-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Reliability surface</p>
                <p className="font-display text-xl font-bold">Production signal map</p>
              </div>
              <TerminalSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="grid gap-4 p-5">
              {[
                ["Traffic", "~10B QPS", "Tier-0 services"],
                ["Data", "10+ PB/day", "Distribution + indexing"],
                ["Automation", "10x faster", "Region/cluster turnup"],
                ["Efficiency", "0.8 MW/hr", "Autoscaling savings"],
              ].map(([label, value, detail], index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-background/70 p-4" key={label}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {[<Network />, <Database />, <Cpu />, <Server />][index]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                  <p className="font-display text-xl font-extrabold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-64 rounded-xl border border-border bg-card p-5 shadow-lg sm:block">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">Current direction</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">SRE, production engineering, platform systems, and AI infrastructure.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">{kicker}</p>
      <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-lg leading-8 text-muted-foreground">{children}</p> : null}
    </div>
  );
}

function Impact({ portfolio }: { portfolio: Portfolio }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="impact">
      <SectionTitle kicker="Quantified impact" title="Infrastructure scale, made observable and faster.">
        A portfolio for production systems should lead with measurable operating impact, not a stack list.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.metrics.map((metric) => (
          <article className="panel fade-in rounded-xl p-6" data-testid={`card-impact-${metric.label}`} key={metric.label}>
            <p className="font-display text-4xl font-extrabold tracking-tight text-foreground">{metric.value}</p>
            <h3 className="mt-3 text-lg font-bold">{metric.label}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.detail}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {portfolio.impactNarrative.map((item) => (
          <div className="rounded-xl bg-secondary p-5 text-sm font-medium leading-6 text-secondary-foreground" key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <article className="relative grid gap-5 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-[0.26fr_0.74fr]" data-testid={`card-experience-${index}`}>
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{item.period}</p>
        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight">{item.role}</p>
        <p className="mt-1 text-sm font-bold text-primary">{item.company}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
      </div>
      <div>
        <p className="text-base leading-7 text-muted-foreground">{item.summary}</p>
        <ul className="mt-5 grid gap-3">
          {item.highlights.map((highlight) => (
            <li className="flex gap-3 text-sm leading-6" key={highlight}>
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className="bg-secondary/45 py-20" id="experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker="Experience" title="From internet banking systems to Meta Core Infra.">
          The through-line is production ownership: define the system, improve the workflow, reduce failure modes, and keep the service healthy.
        </SectionTitle>
        <div className="grid gap-5">
          {experience.map((item, index) => (
            <ExperienceCard index={index} item={item} key={`${item.company}-${item.role}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={project.featured ? "panel rounded-xl p-6 md:col-span-2" : "panel rounded-xl p-6"} data-testid={`card-project-${index}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {project.featured ? "Featured project" : project.period || "Project"}
          </p>
          <h3 className="font-display mt-3 text-2xl font-extrabold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-sm font-bold text-primary">{project.tagline}</p>
        </div>
        {project.links[0] ? (
          <button
            aria-label={`Open ${project.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background hover-elevate active-elevate-2"
            data-testid={`button-project-${index}`}
            onClick={() => openExternal(project.links[0].href)}
            type="button"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  const sortedProjects = useMemo(() => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)), [projects]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="projects">
      <SectionTitle kicker="GitHub and research" title="Selected work that supports the infrastructure story.">
        Public GitHub repositories and academic projects are used as proof points, while private repositories stay private.
      </SectionTitle>
      <div className="grid gap-5 md:grid-cols-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard index={index} key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ groups, certifications }: { groups: SkillGroup[]; certifications: Certification[] }) {
  return (
    <section className="bg-secondary/45 py-20" id="skills">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <SectionTitle kicker="Skills" title="Operating range across reliability, systems, and delivery.">
            The site keeps skills grouped by hiring signal so the strongest SRE and platform evidence is easy to scan.
          </SectionTitle>
          <div className="grid gap-4">
            {groups.map((group) => (
              <article className="rounded-xl border border-border bg-card p-5" data-testid={`card-skill-${group.title}`} key={group.title}>
                <h3 className="font-display text-xl font-extrabold">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Certifications</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.04em]">Continuous learning map.</h2>
          </div>
          <div className="grid gap-4">
            {certifications.map((cert) => (
              <article className="rounded-xl border border-border bg-card p-5" data-testid={`card-cert-${cert.name}`} key={cert.name}>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer} · {cert.issued}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{cert.skills.join(" / ")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle kicker="Education" title="AI, databases, intelligent systems, and computer engineering." />
        <div className="grid gap-4">
          {portfolio.education.map((education) => (
            <article className="panel rounded-xl p-6" key={education.institution}>
              <div className="flex gap-4">
                <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-xl font-extrabold">{education.institution}</h3>
                  <p className="mt-1 font-bold">{education.degree}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{education.period}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{education.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ portfolio }: { portfolio: Portfolio }) {
  return (
    <footer className="border-t border-border bg-card" id="contact">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Contact</p>
          <h2 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.04em]">Let’s talk about reliable systems.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Best fit: SRE, production engineering, platform engineering, core infrastructure, and AI infrastructure roles that need strong systems ownership.
          </p>
          <p className="mt-4 rounded-md bg-secondary p-4 text-sm text-muted-foreground" data-testid="text-maintenance-note">
            Modular content note: {portfolio.maintenance.editHint}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-64">
          {portfolio.profile.links.map((link) => (
            <button
              className="inline-flex min-h-11 items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-bold hover-elevate active-elevate-2"
              data-testid={`button-footer-${link.label.toLowerCase()}`}
              key={link.href}
              onClick={() => (link.href.startsWith("mailto:") ? (window.location.href = link.href) : openExternal(link.href))}
              type="button"
            >
              <span className="inline-flex items-center gap-2">
                {link.label === "GitHub" ? <Github className="h-4 w-4" /> : link.label === "LinkedIn" ? <Linkedin className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                {link.label}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function LoadingPortfolio() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

function PortfolioPage() {
  const { data, isLoading, error } = usePortfolio();

  if (isLoading) {
    return <LoadingPortfolio />;
  }

  if (error || !data) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4">
        <div className="panel max-w-lg rounded-xl p-8 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-primary" />
          <h1 className="font-display mt-4 text-3xl font-extrabold">Portfolio content is unavailable.</h1>
          <p className="mt-3 text-muted-foreground">The modular backend did not return the expected content. Please try refreshing the page.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground" href="#main">
        Skip to content
      </a>
      <Header portfolio={data} />
      <main id="main">
        <Hero portfolio={data} />
        <Impact portfolio={data} />
        <ExperienceSection experience={data.experience} />
        <ProjectsSection projects={data.projects} />
        <SkillsSection certifications={data.certifications} groups={data.skillGroups} />
        <EducationSection portfolio={data} />
      </main>
      <Contact portfolio={data} />
    </>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={PortfolioPage} />
      <Route component={PortfolioPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
