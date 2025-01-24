import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import { ENV } from "env";
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
  UnorderedList,
  Anchor,
  Strong,
  Highlight,
} from "~/components";

const MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <H1 {...props} additionalClasses="mt-12" />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <H2 {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <H3 {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => <H4 {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<"h5">) => <H5 {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<"h6">) => <H6 {...props} />,
  hr: () => <HR additionalClasses="my-12" />,
  p: (props: React.ComponentPropsWithoutRef<"p">) => {
    const { children } = props;
    if (typeof children !== "string" && React.isValidElement(children)) {
      return <>{children}</>;
    }
    return <P {...props} additionalClasses="leading-relaxed" />;
  },
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <Strong {...props} />
  ),
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
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <UnorderedList {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => <Anchor {...props} />,
  mark: (props: React.ComponentPropsWithoutRef<"mark">) => (
    <Highlight {...props} />
  ),
};

export async function loader({ params }: LoaderFunctionArgs) {
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

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = data?.blogPost.title || data?.frontmatter.title;
  const description =
    data?.blogPost.description || data?.frontmatter.description;

  const author = "Matt Millard";
  const siteName = "Matt Millard";

  const baseUrl = ENV.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}${location.pathname}`;

  const imageUrl = data?.blogPost.imageUrl;
  const altText = data?.blogPost.altText;

  const publishedTime = data?.blogPost.createdAt;
  const modifiedTime = data?.blogPost.updatedAt;

  return [
    // Basic Metadata
    { title: `${title} | ${siteName}` },
    { name: "description", content: description },
    { name: "author", content: author },

    // Twitter Card Metadata
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: altText },

    // Open Graph Metadata
    { name: "og:title", content: title },
    { name: "og:type", content: "article" },
    { name: "og:image", content: imageUrl },
    { name: "og:url", content: url },
    { name: "og:site_name", content: siteName },
    { name: "og:image:alt", content: altText },

    // Article Metadata
    { name: "article:published_time", content: publishedTime },
    { name: "article:modified_time", content: modifiedTime },
    { name: "article:author", content: author },
  ];
};
