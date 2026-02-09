import { getAllPosts } from "../lib/blog-data";

const SITE_URL = "https://aridutomo.anaki.id";

export async function GET() {
  const posts = getAllPosts();

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>sosial.aridutomo@gmail.com (${post.author.name})</author>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Ari Dwi Utomo | Blog</title>
    <link>${SITE_URL}</link>
    <description>Blog tentang web development, mobile development, dan teknologi modern. Tips, tutorial, dan pengalaman dari Ari Dwi Utomo.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/avatar.jpg</url>
      <title>Ari Dwi Utomo | Blog</title>
      <link>${SITE_URL}</link>
    </image>
    <managingEditor>sosial.aridutomo@gmail.com (Ari Dwi Utomo)</managingEditor>
    <webMaster>sosial.aridutomo@gmail.com (Ari Dwi Utomo)</webMaster>
    <copyright>© ${new Date().getFullYear()} Ari Dwi Utomo. All rights reserved.</copyright>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
