import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import {
  Avatar,
  CategoryTag,
  DateTime,
  Footer,
  Header,
  NoBlogPosts,
  Socials,
} from "~/components";
import { formatCategoryToSlug } from "~/utils";

export async function loader() {
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

  return { featuredBlogPosts };
}

export default function IndexRoute() {
  const { featuredBlogPosts } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6 lg:px-8">
      <Header />
      <section className="mt-12 flex flex-col-reverse items-center justify-between gap-8 overflow-hidden shadow-sm md:flex-row md:rounded-md md:border md:border-edge-muted-extra md:bg-backdrop-strong">
        {/* Left Section: Text Content */}
        <div className="flex flex-col justify-center md:pl-10">
          <div>
            <p className="text-lg text-color-subtle">Hey, I&apos;m</p>
            <h1 className="ml-3 mt-2 text-4xl font-bold text-color">
              Matt Millard<span className="ml-3">👋</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-color-muted">
              A passionate web developer sharing guides, technical insights, and
              projects. Welcome to my portfolio and blog! <Avatar />
              <span className="ml-1">💻</span>
            </p>
            <div className="mt-8">
              <Socials width={24} height={24} />
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

      <main className="col-start-2 flex-grow pt-12">
        <h2 className="pt-6 text-2xl font-semibold text-color">
          Featured Posts
        </h2>
        <div className="mt-4 border-t border-edge-muted-extra pb-12 pt-6">
          <div>
            {featuredBlogPosts.length > 0 ? (
              featuredBlogPosts.map((post) => (
                <article
                  key={post.id}
                  className="mb-10 flex flex-col items-start justify-between border-b border-edge-subtle pb-10"
                >
                  <Link to={`/blog/${post.slug}`} className="w-full">
                    <div className="flex items-center gap-x-4 text-xs">
                      <DateTime dateTime={post.createdAt} />
                      <CategoryTag
                        href={`/blog/category/${formatCategoryToSlug(post.category)}`}
                        title={post.category}
                      />
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-color group-hover:text-color-subtle">
                        <a href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 max-w-xl text-sm/6 text-color group-hover:text-color-subtle">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <NoBlogPosts />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const meta: MetaFunction = () => [
  { title: "Matt Millard" },
  {
    name: "description",
    content:
      "I'm Matt. Welcome to my portfolio and blog, where I share web development guides, technical insights, and projects.",
  },
];
