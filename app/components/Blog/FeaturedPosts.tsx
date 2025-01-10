import CategoryTag from "./CategoryTag";
import DateTime from "./DateTime";

// Dummy Data
const posts = [
  {
    id: 1,
    title: "Recursively Recurse Recursion",
    href: "/blog/recursion",
    description:
      "Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Algorithms & Data Structures", href: "/blog" },
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
  },
  {
    id: 4,
    title: "Recursively Recurse Recursion",
    href: "/blog/recursion",
    description:
      "Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Algorithms & Data Structures", href: "/blog" },
  },
  {
    id: 5,
    title: "Unlocking TypeScript's Potential",
    href: "/blog/typescript-intro",
    description:
      "Discover why TypeScript is a game-changer for JavaScript developers. From type safety to enhanced developer experience, learn how to start using TypeScript in your projects today.",
    date: "Sep 10, 2022",
    datetime: "2022-09-10",
    category: { title: "Programming Languages", href: "/blog" },
  },
  {
    id: 6,
    title: "Getting Started with Remix Framework",
    href: "/blog/remix-framework",
    description:
      "Explore the fundamentals of the Remix framework and see how it simplifies full-stack development. From routing to server-side rendering, learn why Remix is worth your attention.",
    date: "Jan 5, 2023",
    datetime: "2023-01-05",
    category: { title: "Web Development", href: "/blog" },
  },
  {
    id: 7,
    title: "Recursively Recurse Recursion",
    href: "/blog/recursion",
    description:
      "Demystify the concept of recursion with clear examples and practical use cases. Learn how to break down problems and solve them efficiently using recursive techniques in programming.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Algorithms & Data Structures", href: "/blog" },
  },
  {
    id: 8,
    title: "Unlocking TypeScript's Potential",
    href: "/blog/typescript-intro",
    description:
      "Discover why TypeScript is a game-changer for JavaScript developers. From type safety to enhanced developer experience, learn how to start using TypeScript in your projects today.",
    date: "Sep 10, 2022",
    datetime: "2022-09-10",
    category: { title: "Programming Languages", href: "/blog" },
  },
  {
    id: 9,
    title: "Getting Started with Remix Framework",
    href: "/blog/remix-framework",
    description:
      "Explore the fundamentals of the Remix framework and see how it simplifies full-stack development. From routing to server-side rendering, learn why Remix is worth your attention.",
    date: "Jan 5, 2023",
    datetime: "2023-01-05",
    category: { title: "Web Development", href: "/blog" },
  },
];

export default function FeaturedPosts() {
  return (
    <>
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex max-w-xl flex-col items-start justify-between pb-10"
        >
          <div className="flex items-center gap-x-4 text-xs">
            <DateTime dateTime={post.datetime} date={post.date} />
            <CategoryTag
              href={post.category.href}
              title={post.category.title}
            />
          </div>
          <div className="group relative">
            <h3 className="text-color group-hover:text-color-subtle mt-3 text-lg/6 font-semibold">
              <a href={post.href}>
                <span className="absolute inset-0" />
                {post.title}
              </a>
            </h3>
            <p className="text-color-muted mt-5 line-clamp-3 text-sm/6">
              {post.description}
            </p>
          </div>
        </article>
      ))}
    </>
  );
}
