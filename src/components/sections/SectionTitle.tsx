export default function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">{kicker}</p>
      <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-lg leading-8 text-muted-foreground">{children}</p> : null}
    </div>
  );
}
