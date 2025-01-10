import type { MetaFunction } from "@remix-run/node";
import { FeaturedPosts, Footer, Header, Socials } from "~/components";

export const meta: MetaFunction = () => [
  { title: "Matt Millard" },
  {
    name: "description",
    content:
      "I'm Matt. Welcome to my portfolio and blog, where I share web development guides, technical insights, and projects.",
  },
];

export default function Index() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <Header />
      <section className="md:border-edge-subtle md:bg-backdrop-strong -md mt-12 flex flex-col-reverse items-center justify-between gap-8 overflow-hidden md:flex-row md:rounded-md md:shadow-md">
        {/* Left Section: Text Content */}
        <div className="flex flex-col justify-center md:pl-10">
          <div>
            <p className="text-color-subtle text-lg">Hey, I&apos;m</p>
            <h1 className="text-color ml-3 mt-2 text-4xl font-bold">
              Matt Millard<span className="ml-3">👋</span>
            </h1>
            <p className="text-color-muted mt-4 max-w-md text-base">
              A passionate web developer sharing guides, technical insights, and
              projects. Welcome to my portfolio and blog! 👨‍💻
            </p>
            <div className="mt-8">
              <Socials width={24} height={24} />
            </div>
          </div>
        </div>

        {/* Right Section: Profile Image */}
        <div className="flex-shrink-0">
          <img
            alt="Matt Millard"
            src="https://res.cloudinary.com/hospohub/image/upload/v1736445320/matt_millard_headshot_1x1_2048px_larger_r1f5tn.jpg"
            className="h-40 w-40 rounded-full object-cover md:h-72 md:w-60 md:rounded-none"
          />
        </div>
      </section>

      <main className="col-start-2 pt-24">
        <h2 className="text-color text-xl">Featured Posts</h2>
        <div className="border-edge mt-4 border-t pt-10">
          <FeaturedPosts />
        </div>
      </main>

      <Footer />
    </div>
  );
}
