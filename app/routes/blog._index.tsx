import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ENV } from "env";
import { prisma } from "~/.server/db";
import { CategoryTag, DateTime, H2, H4, P } from "~/components";
import { formatCategoryToSlug } from "~/utils";

export async function loader() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
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

  return { blogPosts };
}

export default function BlogRoute() {
  const { blogPosts } = useLoaderData<typeof loader>();
  return (
    <div className="mt-12">
      <section>
        <H2>Blog posts</H2>
      </section>
      <section className="my-12 space-y-16">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            aria-label={`Read more about ${post.title}`}
            prefetch="intent"
            className="group relative isolate flex flex-col gap-8 rounded-md border border-edge-muted-extra bg-backdrop p-6 transition-colors duration-200 hover:bg-backdrop-muted md:flex-row md:justify-between md:p-10"
          >
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <DateTime dateTime={post.createdAt} />
                <CategoryTag
                  href={`/blog/category/${formatCategoryToSlug(post.category)}`}
                  title={post.category}
                />
              </div>
              <div className="group relative max-w-xl">
                <H4 additionalClasses="mt-3">{post.title}</H4>
                <P additionalClasses="mt-5 text-color-muted">
                  {post.description}
                </P>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-md sm:aspect-[2/1] md:aspect-square md:w-60 md:shrink-0">
              <img
                alt={post.altText}
                src={post.imageUrl}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export const meta: MetaFunction = ({ location }) => {
  const title = "Blog";
  const siteName = "Matt Millard";
  const author = "Matt Millard";
  const description =
    "Hi, I'm Matt! Welcome to the my personal blog, where I share my journey of learning and growth in web development.";
  const imageUrl =
    "https://res.cloudinary.com/hospohub/image/upload/v1736445320/matt_millard_headshot_1x1_2048px_larger_r1f5tn.jpg";
  const altText = "Matt Millard";

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? ENV.BASE_URL
      : "http://localhost:3000";
  const url = `${baseUrl}${location.pathname}`;

  return [
    // Basic Metadata
    { title: `${title} | ${siteName}` },
    {
      name: "description",
      content: description,
    },
    { name: "author", content: author },

    // X (Twitter) Card Metadata
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@_MattMillard" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: altText },

    // Open Graph Metadata
    { name: "og:title", content: title },
    { name: "og:type", content: "website" },
    { name: "og:url", content: url },
    { name: "og:site_name", content: siteName },
    { name: "og:image", content: imageUrl },
    { name: "og:image:alt", content: altText },
    { name: "og:image:type", content: "image/jpeg" },
    { name: "og:image:width", content: "400" },
    { name: "og:image:height", content: "300" },
  ];
};
