import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/.server/db";

export async function loader({ request }: LoaderFunctionArgs) {
  let query = new URL(request.url).searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify(JSON.stringify({ results: [] })));
  }

  query = query.replace(/"/g, '""').trim(); // escape and quotations in query

  try {
    const results = await prisma.$queryRaw`
      WITH search_query AS (SELECT plainto_tsquery('english', ${query}) AS query)
      SELECT 
        id, slug, title, description, "imageUrl", category,
        ts_rank(
          to_tsvector('english', title || ' ' || description || ' ' || content), 
          search_query.query
        ) AS rank,
        ts_headline(
          'english', content, search_query.query, 
          'StartSel=<mark>, StopSel=</mark>'
        ) AS highlight
      FROM "BlogPost", search_query
      WHERE to_tsvector('english', title || ' ' || content) @@ search_query.query
      ORDER BY rank DESC
      LIMIT 10;
    `;

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while searching" }),
      { status: 500 },
    );
  }
}
