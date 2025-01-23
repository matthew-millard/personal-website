import { Category } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import { CategoryTag, DateTime } from "~/components";
import { formatCategory, formatCategoryToSlug } from "~/utils";

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

  const data = {
    blogPosts,
    categoryTitle: formatCategory(category as string),
  };

  return { ...data };
}

export default function BlogCategoryRoute() {
  const { blogPosts, categoryTitle } = useLoaderData<typeof loader>();
  return (
    <div>
      <section>
        <h2 className="text-4xl font-semibold tracking-wide text-color sm:text-5xl">
          {categoryTitle}
        </h2>
        <p className="mt-2 text-base text-color-subtle sm:text-lg">
          {`All my blog posts related to ${categoryTitle}`}
        </p>
      </section>
      <section className="mt-10 space-y-16 pt-10 sm:mt-16 sm:pt-16">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            aria-label={`Read more about ${post.title}`}
            className="group relative isolate flex flex-col gap-8 rounded-md border border-edge-muted-extra bg-backdrop p-6 transition-colors duration-200 hover:bg-backdrop-muted md:p-10 lg:flex-row"
          >
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <DateTime dateTime={post.createdAt} />
                <CategoryTag
                  href={`/blog/category/${formatCategoryToSlug(post.category)}}`}
                  title={post.category}
                />
              </div>
              <div className="group relative max-w-xl">
                <h3 className="mt-3 line-clamp-2 text-lg/6 font-semibold text-color">
                  {post.title}
                </h3>
                <p className="mt-5 line-clamp-6 text-sm/6 text-color-muted">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-md sm:aspect-[2/1] lg:aspect-square lg:w-80 lg:shrink-0">
              <img
                alt={post.altText}
                src={post.imageUrl}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
