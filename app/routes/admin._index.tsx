import { TrashIcon } from "@heroicons/react/24/outline";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { getAdminId } from "~/.server/auth";
import { prisma } from "~/.server/db";
import { H1, H3, H5, ListItem, NoBlogPosts, P } from "~/components";

export async function loader({ request }: LoaderFunctionArgs) {
  const adminId = await getAdminId(request);
  if (!adminId) {
    throw redirect("/admin/login");
  }

  const blogPosts = await prisma.blogPost.findMany();
  return { blogPosts };
}

export default function AdminRoute() {
  const { blogPosts } = useLoaderData<typeof loader>();
  const deleteBlogPost = useFetcher();

  return (
    <div className="mt-12">
      <H1 className="text-4xl text-color">Admin Panel</H1>
      <Form method="POST" action="/admin/logout">
        <button type="submit" className="text-link">
          Log out
        </button>
      </Form>
      {/* Create a link to /admin/new-blog-post */}
      <Link to="/admin/blog/new" className="text-link">
        Create new blog post
      </Link>
      <section className="mt-10 max-w-xl">
        <H3>Blog posts</H3>
        {blogPosts.length > 0 ? (
          <ul className="mt-5 list-outside list-disc space-y-10 pl-4 text-color-subtle">
            {blogPosts.map((post) => (
              <ListItem key={post.id}>
                <article className="flex justify-between gap-x-3">
                  <div>
                    <H5>{post.title}</H5>
                    <P additionalClasses="text-color-muted">
                      {post.description}
                    </P>
                  </div>
                  <deleteBlogPost.Form
                    method="POST"
                    action={`/admin/blog/delete/${post.id}`}
                    className="place-self-end"
                  >
                    <button type="submit">
                      <TrashIcon className="size-5 text-error" />
                    </button>
                  </deleteBlogPost.Form>
                </article>
              </ListItem>
            ))}
          </ul>
        ) : (
          <NoBlogPosts />
        )}
      </section>
    </div>
  );
}
