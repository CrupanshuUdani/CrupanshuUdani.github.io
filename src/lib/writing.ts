import { getCollection, type CollectionEntry } from "astro:content";

/** Non-draft posts, newest first. Zero results means the writing section is dormant. */
export async function getPublishedPosts(): Promise<CollectionEntry<"writing">[]> {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Frontmatter dates are date-only and parse as UTC midnight; format in UTC so no build host shifts the day. */
export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
