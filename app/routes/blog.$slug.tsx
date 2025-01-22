import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import { requireAdminId } from "~/.server/auth";
import { prisma } from "~/.server/db";
import { compileAndBundleMDX } from "~/.server/mdx.server";
import {
  CodeBlock,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  P,
  Code,
  HR,
  OrderedList,
} from "~/components";

const MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => <H1 {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <H2 {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <H3 {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => <H4 {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<"h5">) => <H5 {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<"h6">) => <H6 {...props} />,
  hr: () => <HR />,
  p: (props: React.ComponentPropsWithoutRef<"p">) => <P {...props} />,
  img: (props: React.ComponentPropsWithoutRef<"img">) => <Image {...props} />,
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
    if (React.isValidElement(children) && children.props) {
      const { className, children: code } = children.props;
      return <CodeBlock className={className}>{code}</CodeBlock>;
    }
    return <pre {...props}>{children}</pre>;
  },
  code: (props: React.ComponentPropsWithoutRef<"code">) => <Code {...props} />,
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <OrderedList {...props} />
  ),
};

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
      statusText: "Not Found",
      status: 404,
    });
  }

  const result = await compileAndBundleMDX({
    source: blogPost.content,
  });

  const { code, frontmatter } = result;

  return { blogPost, code, frontmatter };
}

export default function BlogPostRoute() {
  const { code } = useLoaderData<typeof loader>();

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article>
      <Component components={MDXComponents} />
    </article>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.blogPost.title} | Matt Millard` },
    {
      name: "description",
      content: `${data?.blogPost.description}`,
    },
    {
      name: "author",
      content: "Matt Millard",
    },
  ];
};
