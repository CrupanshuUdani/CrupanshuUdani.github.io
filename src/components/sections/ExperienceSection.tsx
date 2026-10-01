import { CheckCircle2 } from "lucide-react";
import type { Experience, SectionCopy } from "@shared/schema";
import SectionTitle from "./SectionTitle";

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

export default function ExperienceSection({ experience, copy }: { experience: Experience[]; copy: SectionCopy }) {
  return (
    <section className="bg-secondary/45 py-20" id="experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle copy={copy} />
        <div className="grid gap-5">
          {experience.map((item, index) => (
            <ExperienceCard index={index} item={item} key={`${item.company}-${item.role}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
