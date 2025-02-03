import { MetaFunction } from "@remix-run/node";
import { GenericErrorBoundary, H2, H3, H5, HR, P } from "~/components";

export async function loader() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";
  return new Response(JSON.stringify({ baseUrl }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export default function AboutRoute() {
  return (
    <div className="my-12">
      <div>
        <H2>About me</H2>
        <H5 additionalClasses="mt-3 text-color-muted">
          {"Hi, I'm Matt, and I am a developer living in Ottawa, Canada 🇨🇦."}
        </H5>
      </div>
      <section className="mt-6 space-y-6">
        <P>
          My coding journey began in 2021 when I needed to build a website for a
          new e-commerce photography business I was starting with my wife, Amy,
          as a side hustle. With no technical expertise in web development and
          no budget to hire a developer, I turned to Squarespace to get the site
          up and running. To jazz the site up and make it look and feel a little
          less &quot;drag and drop,&quot; I bought code snippets from developers
          online to implement features Squarespace didn&apos;t natively support.
          This was my first time encountering HTML, CSS, and JavaScript—it got
          me thinking: maybe I could learn to code!
        </P>
        <P>
          For the better part of six months, I immersed myself in learning HTML
          and CSS using online platforms like Treehouse and Codecademy. As I
          built projects and solved challenges, my passion for coding grew into
          something I knew I wanted to pursue as a career. Like many others
          taking their first steps into the field, I decided to enroll in a
          six-month coding bootcamp at the University of Toronto.
        </P>
        <P>
          Well... I can confidently say I knocked it out of the park. I loved
          every minute of it. Every week, I was learning something new and
          seeing the results of my efforts come to life. There&apos;s nothing
          quite like writing lines of code and watching them transform into
          functional, beautiful applications. The process of turning ideas into
          tangible results had me completely hooked.
        </P>
      </section>
      <HR additionalClasses="my-12" />
      <section className="space-y-6">
        <H3>More on me...</H3>
        <P>
          Creativity has always been at the heart of what I do. I was fortunate
          to receive a scholarship to study Audio Engineering in Byron Bay,
          Australia 🇦🇺, where I dove headfirst into the world of sound and music
          production. I spent countless hours creating electronic dance tracks
          and fully believed I was destined to become the next deadmau5 🤣.
        </P>
        <P>
          Spoiler alert: my dreams of becoming an internationally touring DJ
          didn’t quite pan out. But that journey taught me the value of
          perseverance, creativity, and working towards something you’re
          passionate about.
        </P>
        <P>
          Later, I found myself drawn to the cocktail renaissance. I became a
          cocktail bartender and was lucky enough to work in some of the best
          bars in the world, collaborating with renowned spirit brands and
          creating unique drinking experiences for guests. That chapter of my
          life honed my skills in attention to detail, experimentation, and
          connecting with people.
        </P>
        <P>
          These days, I channel that same creativity and drive into web
          development. I love the process of building something from scratch and
          solving problems through code, blending my passion for design and
          functionality. Whether I’m crafting an app like Hospo Hub or
          experimenting with new tools like Remix and TypeScript, I’m always
          excited to create and learn.
        </P>
      </section>
    </div>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = "About";
  const siteName = "Matt Millard";
  const author = "Matt Millard";
  const description =
    "Hi, I'm Matt! Welcome to the my personal blog, where I share my journey of learning and growth in web development.";
  const imageUrl =
    "https://res.cloudinary.com/hospohub/image/upload/v1736445320/matt_millard_headshot_1x1_2048px_larger_r1f5tn.jpg";
  const altText = "Matt Millard";

  const baseUrl = data?.baseUrl;
  const url = `${baseUrl}${location.pathname}`;

  return [
    // Basic Metadata
    { title: `${title} | ${siteName}` },
    {
      name: "description",
      content: description,
    },
    { name: "author", content: author },

    // X (Twitter) Card Metadata
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@_MattMillard" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: altText },

    // Open Graph Metadata
    { name: "og:title", content: title },
    { name: "og:type", content: "website" },
    { name: "og:url", content: url },
    { name: "og:site_name", content: siteName },
    { name: "og:image", content: imageUrl },
    { name: "og:image:alt", content: altText },
    { name: "og:image:type", content: "image/jpeg" },
    { name: "og:image:width", content: "400" },
    { name: "og:image:height", content: "300" },
  ];
};

export function ErrorBoundary() {
  return <GenericErrorBoundary />;
}
