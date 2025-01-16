export async function loader() {
  const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
  
          <loc>http://www.mattmillard.com/</loc>
  
          <lastmod>2025-01-15</lastmod>
  
          <changefreq>weekly</changefreq>
  
          <priority>0.5</priority>
  
      </url>
      <url>
  
          <loc>http://www.mattmillard.com/about/</loc>
  
          <lastmod>2025-01-15</lastmod>
  
          <changefreq>yearly</changefreq>
  
          <priority>0.1</priority>
  
      </url>
      <url>
  
          <loc>http://www.mattmillard.com/blog/</loc>
  
          <lastmod>2025-01-15</lastmod>
  
          <changefreq>weekly</changefreq>
  
          <priority>0.8</priority>
  
      </url>
      
      </urlset> 
      `;

  try {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400", // Cache for a day
      },
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating sitemap:", error.message);
    } else {
      console.error("Unknown error occurred while generating sitemap");
    }

    throw new Response("Internal server error", { status: 500 });
  }
}
