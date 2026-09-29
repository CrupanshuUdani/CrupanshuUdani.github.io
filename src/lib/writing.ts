import { getCollection, type CollectionEntry } from "astro:content";

/** Non-draft posts, newest first. Zero results means the writing section is dormant. */
export async function getPublishedPosts(): Promise<CollectionEntry<"writing">[]> {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
