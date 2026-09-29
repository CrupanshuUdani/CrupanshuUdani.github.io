import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Link } from "@shared/schema";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <svg
        aria-label={`${name} portfolio mark`}
        className="h-11 w-11 text-primary"
        fill="none"
        viewBox="0 0 48 48"
      >
        <rect width="42" height="42" x="3" y="3" rx="12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M17 16c-4 0-7 3.1-7 8s3 8 7 8c2.8 0 5-1.1 6.4-3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
        <path d="M27 15v10.2c0 4.2 2.3 6.8 6 6.8s6-2.6 6-6.8V15" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
      <div>
        <p className="font-display text-base font-bold leading-tight">{name}</p>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Core Infra</p>
      </div>
    </div>
  );
}

// Must stay in sync with the pre-paint init script in src/components/ThemeScript.astro.
const THEME_STORAGE_KEY = "theme";

function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable — the choice still applies for this session.
    }
  }

  // No React state: the pre-paint script already set .dark on <html>, and every theme-dependent
  // piece below (icon and accessible name) is chosen by CSS from that class. State would render
  // "light" on the server and mismatch on hydration.
  return (
    <button
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs hover-elevate active-elevate-2"
      data-testid="button-theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <Sun className="hidden h-5 w-5 dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </button>
  );
}

// Section anchors are stored as "#about"; rendered root-relative so they work from /writing/<slug>/ too.
function navHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export default function Header({ navigation, name }: { navigation: Link[]; name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = navigation;

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#") || window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.pushState(null, "", href);
    scrollToHash(href);
  }

  useEffect(() => {
    if (window.location.pathname !== "/" || !window.location.hash) return;
    const hash = window.location.hash;
    document.fonts.ready.then(() => scrollToHash(hash));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          className="text-left"
          data-testid="button-scroll-home"
          href="/"
          onClick={(event) => {
            if (window.location.pathname !== "/") return;
            event.preventDefault();
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo name={name} />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              data-testid={`link-nav-${item.label.toLowerCase()}`}
              href={navHref(item.href)}
              key={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden"
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden" data-testid="nav-mobile">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map((item) => (
              <a
                className="rounded-md px-3 py-3 text-left text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                href={navHref(item.href)}
                key={item.href}
                onClick={(event) => {
                  setMenuOpen(false);
                  handleNavClick(event, item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
