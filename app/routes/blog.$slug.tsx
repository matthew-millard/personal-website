import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAdminId } from "~/.server/auth";
import { prisma } from "~/.server/db";
import { DateTime, CategoryTag, ReadTime, H1 } from "~/components";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const { slug } = params;
  const blogPost = await prisma.blogPost.findFirst({
    where: {
      slug,
    },
  });

  if (!blogPost) {
    throw new Response(`Blog post not found for slug: ${slug}`, {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ blogPost }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export default function BlogPostRoute() {
  const { blogPost } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex items-center gap-2">
        <DateTime
          fontSize="text-base"
          fontWeight="font-medium"
          dateTime={blogPost.createdAt}
        />
        <p className="font-medium text-primary">|</p>
        <ReadTime fontSize="text-base" text={"14 min"} />
      </div>
      <div className="mt-2">
        <CategoryTag title={blogPost.category} href={"/blog"} />
      </div>
      <H1>{blogPost.title}</H1>
      <article>{blogPost.content}</article>
    </div>
  );
}
