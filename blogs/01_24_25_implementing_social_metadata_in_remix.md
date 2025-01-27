# Implementing Social Metadata in Remix

![Remix Logo](https://res.cloudinary.com/hospohub/image/upload/v1737929608/remix-glowing_eo2jja.png)

It's nice when you share links on social media platforms such as Facebook, Instagram, and X. These links are presented in neatly formatted cards displaying an image, title, summary, and link. This is made possible by adding certain `<meta>` tags in the `<head>` of the HTML document.

There are two main standards that determine how to format this metadata [X (Twitter) Cards](https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards), and the [Open Graph protocol](https://ogp.me/). Let's start with adding dynamic X Cards to our blog pages using the [meta function](https://remix.run/docs/en/main/route/meta) in Remix.

## X Cards

The first step is to choose a type of card you want to implement ([X Card Types](https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards#:~:text=Drive%20engagement%20from,Started%20Guide.)) and then add the corresponding `<meta>` tags to the document.

For my `/blog/$slug` route, I decided to use the [Summary Card With Large Image](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image). I used the `meta` function along with the data from my `loader` function to dynamically generate the correct meta tags for each blog page.

```tsx
/* routes/blog.$slug.tsx; */

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title:
        `${data?.blogPost.title} | Matt Millard` || data?.frontmatter.title,
    },
    {
      name: "description",
      content: data?.blogPost.description || data?.frontmatter.description,
    },
    {
      name: "author",
      content: "Matt Millard",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: data?.blogPost.title || data?.frontmatter.title,
    },
    {
      name: "twitter:description",
      content: data?.blogPost.description || data?.frontmatter.description,
    },
    { name: "twitter:image", content: data?.blogPost.imageUrl },
    { name: "twitter:image:alt", content: data?.blogPost.altText },
  ];
};
```

Some of these `<meta>` tags are required for the Card type ([Summary Card With Large Image](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image)), while others are optional. I included what I felt was necessary for this page.

---

### Test your Card

Once you have set the appropriate meta tags for your chosen card, redeploy your site. You need to test it directly in the Twitter Composer to see an accurate representation of what your card will look like. Don't worry—you don’t have to post a tweet!

The [Twitter Card Validator](https://cards-dev.x.com/validator) is no longer available ([read more about that here](https://devcommunity.x.com/t/card-validator-preview-removal/175006)).

It's possible to test your Card in development when running your server on `http://localhost` by using [ngrok](https://dashboard.ngrok.com/get-started/setup/macos). Copy and paste the url from ngrok into the Twitter Composer to test it out.

---

## The Open Graph Protocol

With the **Open Graph Protocol**, there are two types of metadata you can add: basic and optional. I want to show you how to implement **_OGP metadata_** effectively in Remix, so I’ll let you explore more details on the [Open Graph Protocol site](https://ogp.me/).

```tsx
/* routes/blog.$slug.tsx; */

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = data?.blogPost.title || data?.frontmatter.title;
  const description =
    data?.blogPost.description || data?.frontmatter.description;

  const author = "Matt Millard";
  const siteName = "Matt Millard";

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? ENV.BASE_URL
      : "http://localhost:3000";
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
```

That’s it for this route! Select the OGP metadata that best suits your page and test it on Facebook or other social platforms.
