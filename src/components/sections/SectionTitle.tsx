import type { SectionCopy } from "@shared/schema";

export default function SectionTitle({ copy }: { copy: SectionCopy }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">{copy.kicker}</p>
      <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{copy.title}</h2>
      {copy.subtitle ? <p className="mt-4 text-lg leading-8 text-muted-foreground">{copy.subtitle}</p> : null}
    </div>
  );
}
