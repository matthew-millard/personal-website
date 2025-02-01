import { BlogPost } from "@prisma/client";
import { prisma } from "~/.server/db";
import { ENV } from "~/env";

export interface GenerateRss {
  baseUrl: string;
  title: string;
  link: string;
  description: string;
  pubDate: BlogPost["createdAt"];
  author?: string;
  guid?: string;
}

const escapeXML = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function generateRss({
  baseUrl,
  title,
  link,
  description,
  pubDate,
  author,
}: GenerateRss) {
  return `<item>
              <title>${title}</title>
              <link>${baseUrl}/blog/${link}/</link>
              <guid isPermaLink='true'>${baseUrl}/blog/${link}/</guid>
              <description>${escapeXML(description)}</description>
              <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
              <author>Matthew.Richie.Millard@gmail.com (${author})</author>
          </item>
          `;
}

export async function loader() {
  const author = "Matt Millard";
  const description = `Hi, I'm Matt! Welcome to the my personal blog, where I share my journey of learning and growth in web development.`;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? ENV.BASE_URL
      : "http://localhost:3000";

  const pages = await prisma.blogPost.findMany({
    select: {
      title: true,
      slug: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const feed = `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
          <title>${author} blog</title>
          <description>${description}</description>
          <link>${baseUrl}/</link>
          <language>en-CA</language>
          <copyright>Copyright © ${new Date().getFullYear()} ${author}</copyright>
          ${pages
            .map((page) => {
              return generateRss({
                baseUrl,
                title: page.title,
                description: page.description,
                pubDate: page.createdAt,
                link: page.slug,
                author,
              });
            })
            .join("")}
    </channel>
  </rss>
`;

  try {
    return new Response(feed, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=2419200", // 4 weeks
      },
    });
  } catch (error) {
    console.error("Error generating rss feed:", error);

    throw new Response("Internal server error", { status: 500 });
  }
}
