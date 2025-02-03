import { prisma } from "~/.server/db";

export async function loader() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";

  const staticPages = [
    { loc: "/", lastmod: "2025-01-15", changefreq: "weekly", priority: 0.7 },
    {
      loc: "/about/",
      lastmod: "2025-01-15",
      changefreq: "yearly",
      priority: 0.1,
    },
    {
      loc: "/blog/",
      lastmod: "2025-01-15",
      changefreq: "weekly",
      priority: 0.9,
    },
  ];

  // Fetch blog posts from the database
  const blogPosts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Transform blog post data into Sitemap format
  const dynamicPages = blogPosts.map((post) => ({
    loc: `/blog/${post.slug}/`, // Needs trailing '/'
    lastmod: post.updatedAt.toISOString().split("T")[0],
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `,
      )
      .join("")}
  </urlset>`;

  try {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400", // Cache for a day
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    throw new Response("Internal server error", { status: 500 });
  }
}
