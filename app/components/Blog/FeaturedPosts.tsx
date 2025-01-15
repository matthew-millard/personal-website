import posts from "~/data/blog";
import CategoryTag from "./CategoryTag";
import DateTime from "./DateTime";
import NoBlogPosts from "./NoBlogPosts";

export default function FeaturedPosts() {
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <article
            key={post.id}
            className="mb-10 flex flex-col items-start justify-between border-b border-edge-subtle pb-10"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <DateTime dateTime={post.datetime} date={post.date} />
              <CategoryTag
                href={post.category.href}
                title={post.category.title}
              />
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg/6 font-semibold text-color group-hover:text-color-muted">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 max-w-xl text-sm/6 text-color-muted">
                {post.description}
              </p>
            </div>
          </article>
        ))
      ) : (
        <NoBlogPosts />
      )}
    </>
  );
}
