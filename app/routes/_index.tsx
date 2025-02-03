import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import {
  Avatar,
  CategoryTag,
  DateTime,
  DownloadCV,
  Footer,
  H2,
  H4,
  H5,
  Header,
  HR,
  NoBlogPosts,
  P,
  Small,
  Socials,
} from "~/components";

import { formatCategoryToSlug } from "~/utils";

export async function loader() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";

  const featuredBlogPosts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc", // Newest posts first
    },
    select: {
      category: true,
      createdAt: true,
      description: true,
      id: true,
      slug: true,
      title: true,
    },
    take: 3, // Limit to 3
  });

  return { featuredBlogPosts, baseUrl };
}

export default function IndexRoute() {
  const { featuredBlogPosts } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6">
      <Header />
      <section className="mt-12 flex flex-col-reverse items-center justify-between gap-8 overflow-hidden shadow-sm md:flex-row md:rounded-md md:border md:border-edge-muted-extra md:bg-backdrop-strong">
        {/* Left Section: Text Content */}
        <div className="flex flex-col justify-center md:pl-10">
          <div>
            <P additionalClasses="text-lg text-color-subtle">Hey, I&apos;m</P>
            <H2 additionalClasses="pl-4 text-2xl">
              Matt Millard<span className="ml-3">👋</span>
            </H2>
            <P additionalClasses="mt-3 max-w-md md:max-w-none">
              A passionate web developer sharing guides, technical insights, and
              projects. Welcome to my portfolio and blog! <Avatar />
              <span className="ml-1">💻</span>
            </P>
            <div className="mt-8 flex items-center justify-between">
              <Socials width={24} height={24} />
              <DownloadCV />
            </div>
          </div>
        </div>

        {/* Right Section: Profile Image */}
        <div className="flex-shrink-0">
          <img
            alt="Matt Millard"
            src="https://res.cloudinary.com/hospohub/image/upload/v1736445320/matt_millard_headshot_1x1_2048px_larger_r1f5tn.jpg"
            className="h-40 w-40 rounded-full object-cover md:h-72 md:w-60 md:rounded-none"
          />
        </div>
      </section>

      <main className="col-start-2 flex-grow">
        <H4 additionalClasses="mt-12">Featured Posts</H4>
        <HR additionalClasses="mt-1" />
        <div className="mb-12 mt-12 pb-12">
          {featuredBlogPosts.length > 0 ? (
            featuredBlogPosts.map((post) => (
              <article
                key={post.id}
                className="mt-12 flex flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <DateTime dateTime={post.createdAt} />
                  <CategoryTag
                    href={`/blog/category/${formatCategoryToSlug(post.category)}`}
                    title={post.category}
                  />
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  prefetch="intent"
                  className="group relative"
                >
                  <H5 additionalClasses="mt-3 group-hover:text-color-hover">
                    {post.title}
                  </H5>
                  <Small additionalClasses="group-hover:text-color-hover text-color-muted mt-1 max-w-xl">
                    {post.description}
                  </Small>
                </Link>
              </article>
            ))
          ) : (
            <NoBlogPosts />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = "Blog";
  const siteName = "Matt Millard";
  const author = "Matt Millard";
  const description =
    "I'm Matt. Welcome to my portfolio and blog, where I share web development guides, technical insights, and projects.";
  const imageUrl =
    "https://res.cloudinary.com/hospohub/image/upload/v1736445320/matt_millard_headshot_1x1_2048px_larger_r1f5tn.jpg";
  const altText = "Matt Millard";

  const baseUrl = data?.baseUrl;
  const url = `${baseUrl}${location.pathname}`;

  return [
    // Basic Metadata
    { title: siteName },
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
