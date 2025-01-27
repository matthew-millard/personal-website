import { ENV } from "env";
import { prisma } from "~/.server/db";

export async function loader() {
  const author = "Matt Millard";
  const description = `Hi, I'm Matt! Welcome to the my personal blog, where I share my journey of learning and growth in web development.`;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? ENV.BASE_URL
      : "http://localhost:3000";

  const blogPosts = await prisma.blogPost.findMany({
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

  const rssFeed = `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${author} blog</title>
        <description>${description}</description>
        <link>${baseUrl}/</link>
        ${blogPosts
          .map((post) => {
            return `
            <item>
                <title>${post.title}</title>
                <link>${baseUrl}/blog/${post.slug}/</link>
                <guid isPermaLink='true'>${baseUrl}/blog/${post.slug}/</guid>
                <description>${post.description}</description>
                <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
                <author>${author}</author>
            </item>
            `;
          })
          .join("\n")}
    </channel>
  </rss>
  `.trim();

  try {
    return new Response(rssFeed, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400", // Cache for a day
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating rss feed:", error);

    throw new Response("Internal server error", { status: 500 });
  }
}
