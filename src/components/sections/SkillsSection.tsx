import { BookOpen } from "lucide-react";
import type { Certification, SkillGroup } from "@shared/schema";
import SectionTitle from "./SectionTitle";

export default function SkillsSection({ groups, certifications }: { groups: SkillGroup[]; certifications: Certification[] }) {
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
