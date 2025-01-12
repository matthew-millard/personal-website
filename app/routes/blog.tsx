import { MetaFunction } from "@remix-run/node";
import { CategoryTag, DateTime, Footer, Header } from "~/components";

export const meta: MetaFunction = () => [
  { title: "Blog | Matt Millard" },
  {
    name: "description",
    content:
      "Welcome to the blog! Join me on my journey of learning and exploration in the world of web development. Here, you'll find my thoughts on React, Remix, TypeScript, and other web development topics.",
  },
];

// Dummy Data
const posts = [
  {
    id: 1,
    title:
      "Recursively Recurse Recursion Recursively Recurse Recursion Recursively Recurse Recursion Recursively Recurse Recursion",
    href: "/blog/recursion",
    description:
      "Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming. Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming. Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming. Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming. Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Algorithms & Data Structures", href: "/blog" },
    image: {
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      altText: "Recursive algorithm",
    },
  },
  {
    id: 2,
    title: "Unlocking TypeScript's Potential",
    href: "/blog/typescript-intro",
    description:
      "Discover why TypeScript is a game-changer for JavaScript developers. From type safety to enhanced developer experience, learn how to start using TypeScript in your projects today.",
    date: "Sep 10, 2022",
    datetime: "2022-09-10",
    category: { title: "Programming Languages", href: "/blog" },
    image: {
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      altText: "Typescript code",
    },
  },
  {
    id: 3,
    title: "Getting Started with Remix Framework",
    href: "/blog/remix-framework",
    description:
      "Explore the fundamentals of the Remix framework and see how it simplifies full-stack development. From routing to server-side rendering, learn why Remix is worth your attention.",
    date: "Jan 5, 2023",
    datetime: "2023-01-05",
    category: { title: "Web Development", href: "/blog" },
    image: {
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      altText: "Remix logo",
    },
  },
];

export default function BlogRoute() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6 lg:px-8">
      <Header />
      <main className="flex-grow">
        <section className="pt-20">
          <h2 className="text-4xl font-semibold tracking-tight text-color sm:text-5xl">
            Blog posts
          </h2>
          <p className="mt-2 text-base text-color-subtle sm:text-lg">
            Join me on my journey of learning and growth in the world of web
            development.
          </p>
        </section>
        <section className="my-10 space-y-20">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative isolate flex flex-col gap-8 rounded-md bg-backdrop p-10 transition-colors duration-200 hover:bg-backdrop-muted lg:flex-row"
            >
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <DateTime date={post.date} dateTime={post.datetime} />
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
      </main>
      <Footer />
    </div>
  );
}
