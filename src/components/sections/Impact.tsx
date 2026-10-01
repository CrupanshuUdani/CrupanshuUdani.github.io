import type { Portfolio } from "@shared/schema";
import SectionTitle from "./SectionTitle";

export default function Impact({ portfolio }: { portfolio: Portfolio }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="impact">
      <SectionTitle copy={portfolio.sections.impact} />
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
