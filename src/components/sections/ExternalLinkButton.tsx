import { ArrowUpRight } from "lucide-react";
import type { Link } from "@shared/schema";

export default function ExternalLinkButton({ link, primary = false }: { link: Link; primary?: boolean }) {
  const external = !link.href.startsWith("mailto:");

  return (
    <a
      className={
        primary
          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm hover-elevate active-elevate-2"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover-elevate active-elevate-2"
      }
      data-testid={`link-${link.label.toLowerCase()}`}
      href={link.href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {link.label}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
