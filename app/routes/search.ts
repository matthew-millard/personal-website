import { BlogPost } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/.server/db";

export type SearchResults = Pick<
  BlogPost,
  "title" | "description" | "id" | "category" | "slug"
>;

export async function loader({ request }: LoaderFunctionArgs) {
  let query = new URL(request.url).searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  query = query.replace(/"/g, '""').trim(); // escape and quotations in query

  try {
    const searchResults: SearchResults[] = await prisma.$queryRaw`
      WITH search_query AS (SELECT plainto_tsquery('english', ${query}) AS query)
      SELECT 
        id, slug, title, description, category,
        ts_rank(
          to_tsvector('english', title || ' ' || description || ' ' || content), 
          search_query.query
        ) AS rank
      FROM "BlogPost", search_query
      WHERE to_tsvector('english', title || ' ' || content) @@ search_query.query
      ORDER BY rank DESC
      LIMIT 10;
    `;

    return new Response(JSON.stringify(searchResults), {
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
