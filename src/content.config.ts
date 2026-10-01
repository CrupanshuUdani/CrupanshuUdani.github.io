import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string().min(1),
    // Kept inside the range link-preview scrapers actually display.
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Cadence tiers from the writing strategy: TILs are site-only, never promoted.
    tier: z.enum(["field-note", "essay", "til"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Set only when a post was first published elsewhere; normally the site is canonical.
    canonicalOverride: z.url().optional(),
  }),
});

export const collections = { writing };
