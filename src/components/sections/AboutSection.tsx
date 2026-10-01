import type { Portfolio } from "@shared/schema";
import SectionTitle from "./SectionTitle";

export default function AboutSection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="about">
      <SectionTitle copy={portfolio.sections.about} />
      <div className="grid gap-5 lg:grid-cols-2">
        {portfolio.about.map((paragraph, index) => (
          <p className="panel rounded-xl p-6 text-base leading-7 text-muted-foreground" data-testid={`text-about-${index}`} key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
