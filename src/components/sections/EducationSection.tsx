import { GraduationCap } from "lucide-react";
import type { Portfolio } from "@shared/schema";
import SectionTitle from "./SectionTitle";

export default function EducationSection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle copy={portfolio.sections.education} />
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
