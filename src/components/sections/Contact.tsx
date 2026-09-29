import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { Portfolio } from "@shared/schema";

export default function Contact({ portfolio }: { portfolio: Portfolio }) {
  return (
    <footer className="border-t border-border bg-card" id="contact">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Contact</p>
          <h2 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.04em]">Let’s talk about reliable systems.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Best fit: {portfolio.profile.rolesOfInterest} roles that need strong systems ownership.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-64">
          {portfolio.profile.links.map((link) => (
            <a
              className="inline-flex min-h-11 items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-bold hover-elevate active-elevate-2"
              data-testid={`link-footer-${link.label.toLowerCase()}`}
              href={link.href}
              key={link.href}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <span className="inline-flex items-center gap-2">
                {link.label === "GitHub" ? <Github className="h-4 w-4" /> : link.label === "LinkedIn" ? <Linkedin className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                {link.label}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
