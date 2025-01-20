import { MetaFunction } from "@remix-run/node";
import { CategoryTag, DateTime } from "~/components";
import posts from "~/data/blog";

export const meta: MetaFunction = () => [
  { title: "Blog | Matt Millard" },
  {
    name: "description",
    content:
      "Welcome to the blog! Join me on my journey of learning and exploration in the world of web development. Here, you'll find my thoughts on React, Remix, TypeScript, and other web development topics.",
  },
];

export default function BlogRoute() {
  return (
    <div>
      <section className="">
        <h2 className="text-4xl font-semibold tracking-wide text-color sm:text-5xl">
          Blog posts
        </h2>
        <p className="mt-2 text-base text-color-subtle sm:text-lg">
          Join me on my journey of learning and growth in the world of web
          development.
        </p>
      </section>
      <section className="mt-10 space-y-16 pt-10 sm:mt-16 sm:pt-16">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group relative isolate flex flex-col gap-8 rounded-md border border-edge-muted-extra bg-backdrop p-6 transition-colors duration-200 hover:bg-backdrop-muted md:p-10 lg:flex-row"
          >
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <DateTime dateTime={post.datetime} />
                <CategoryTag
                  href={post.category.href}
                  title={post.category.title}
                />
              </div>
              <div className="group relative max-w-xl">
                <h3 className="mt-3 line-clamp-2 text-lg/6 font-semibold text-color">
                  <a
                    href={post.href}
                    aria-label={`Read more about ${post.title}`}
                  >
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-6 text-sm/6 text-color-muted">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-md sm:aspect-[2/1] lg:aspect-square lg:w-80 lg:shrink-0">
              <img
                alt={post.image.altText}
                src={post.image.imageUrl}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
