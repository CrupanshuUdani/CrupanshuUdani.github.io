import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../lib/writing";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Crupanshu Udani — Writing",
    description: "Reliability and operations for AI systems.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
}
