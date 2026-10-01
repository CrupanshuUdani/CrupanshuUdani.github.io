import { Cpu, Database, Network, Server, TerminalSquare } from "lucide-react";
import type { Portfolio } from "@shared/schema";
import ExternalLinkButton from "./ExternalLinkButton";

export default function Hero({ portfolio }: { portfolio: Portfolio }) {
  const { profile, metrics, heroPanel } = portfolio;
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
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{heroPanel.kicker}</p>
                <p className="font-display text-xl font-bold">{heroPanel.title}</p>
              </div>
              <TerminalSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="grid gap-4 p-5">
              {[metrics[0], metrics[2], metrics[3], metrics[5]].map((metric, index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-background/70 p-4" key={metric.label}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {[<Network />, <Database />, <Cpu />, <Server />][index]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.detail}</p>
                  </div>
                  <p className="font-display text-xl font-extrabold text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-64 rounded-xl border border-border bg-card p-5 shadow-lg sm:block">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">{heroPanel.directionLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.rolesOfInterest}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
