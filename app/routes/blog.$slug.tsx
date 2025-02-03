import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
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
  DateTime,
  ReadTime,
} from "~/components";

const MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => <H1 {...props} />,
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
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";
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

  const lastModified = new Date(blogPost.updatedAt).toUTCString();

  return new Response(
    JSON.stringify({ blogPost, code, frontmatter, baseUrl }),
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=60", // one hour
        "Content-Type": "application/json",
        "Last-Modified": lastModified,
      },
      status: 200,
    },
  );
}

export default function BlogPostRoute() {
  const { blogPost, code } = useLoaderData<typeof loader>();

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <div className="mb-3 mt-12 flex items-baseline gap-x-2">
        <DateTime
          dateTime={blogPost.createdAt}
          fontWeight="font-medium"
          fontSize="text-base"
        />
        <P additionalClasses="font-semibold text-base text-color-subtle">|</P>
        <ReadTime text="3 mins" fontWeight="font-medium" fontSize="text-base" />
      </div>

      <article>
        <Component components={MDXComponents} />
      </article>
    </>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = data?.blogPost.title || data?.frontmatter.title;
  const description =
    data?.blogPost.description || data?.frontmatter.description;

  const author = "Matt Millard";
  const siteName = "Matt Millard";

  const baseUrl = data?.baseUrl;
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

    // X (Twitter) Card Metadata
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@_MattMillard" },
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
