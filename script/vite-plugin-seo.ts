import type { Plugin } from "vite";
import { portfolio } from "../shared/portfolio";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function seoMetaPlugin(): Plugin {
  return {
    name: "seo-meta-tags",
    transformIndexHtml(html) {
      const { profile, seo } = portfolio;
      const title = escapeHtml(seo.title);
      const description = escapeHtml(seo.description);
      const siteUrl = escapeHtml(seo.siteUrl);
      const ogImage = escapeHtml(seo.ogImage);

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: seo.siteUrl,
        image: seo.ogImage,
        jobTitle: profile.title,
        sameAs: profile.links
          .filter((link) => !link.href.startsWith("mailto:"))
          .map((link) => link.href),
      };

      const tags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${siteUrl}" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${siteUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="${seo.ogImageWidth}" />
    <meta property="og:image:height" content="${seo.ogImageHeight}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

      return html.replace("<!-- SEO_META_TAGS -->", tags);
    },
  };
}
