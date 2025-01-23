import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import { CategoryTag, DateTime } from "~/components";

export async function loader() {
  const blogPosts = await prisma.blogPost.findMany();

  return { blogPosts };
}

export default function BlogRoute() {
  const { blogPosts } = useLoaderData<typeof loader>();
  return (
    <div>
      <section>
        <h2 className="text-4xl font-semibold tracking-wide text-color sm:text-5xl">
          Blog posts
        </h2>
        <p className="mt-2 text-base text-color-subtle sm:text-lg">
          Join me on my journey of learning and growth in the world of web
          development.
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
                  href={`/blog/category/${post.category.replace(/_/g, "-").toLowerCase()}`}
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

export const meta: MetaFunction = () => [
  { title: "Blog | Matt Millard" },
  {
    name: "description",
    content:
      "Welcome to the blog! Join me on my journey of learning and exploration in the world of web development. Here, you'll find my thoughts on React, Remix, TypeScript, and other web development topics.",
  },
];
