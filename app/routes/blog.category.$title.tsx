import { Category } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/.server/db";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { title } = params;

  // Convert the title to match enum format (e.g., WEB_DEVELOPMENT)
  const category = title?.replace(/-/g, "_").toUpperCase();

  // Validate if the category is part of the enum
  if (!Object.values(Category).includes(category as Category)) {
    throw new Response("Invalid category", {
      status: 400,
      statusText: `The category '${title}' is invalid.`,
    });
  }

  const blogPosts = await prisma.blogPost.findMany({
    where: {
      category: category as Category,
    },
    select: {
      altText: true,
      category: true,
      createdAt: true,
      description: true,
      id: true,
      imageUrl: true,
      slug: true,
      title: true,
      updatedAt: true,
    },
  });

  if (!blogPosts) {
    throw new Response("Not Found", {
      status: 404,
      statusText: `${request.url} not found`,
    });
  }

  console.log(blogPosts);
  return { blogPosts };
}

export default function BlogCategoryRoute() {
  return <h1>Blog Category Route</h1>;
}
