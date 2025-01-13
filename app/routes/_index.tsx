import type { MetaFunction } from "@remix-run/node";
import {
  CodeBlock,
  DateTime,
  FeaturedPosts,
  Footer,
  Header,
  Socials,
} from "~/components";

export const meta: MetaFunction = () => [
  { title: "Matt Millard" },
  {
    name: "description",
    content:
      "I'm Matt. Welcome to my portfolio and blog, where I share web development guides, technical insights, and projects.",
  },
];

export default function IndexRoute() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <Header />
      <section className="md:border-edge-muted-extra mt-12 flex flex-col-reverse items-center justify-between gap-8 overflow-hidden shadow-sm md:flex-row md:rounded-md md:border md:bg-backdrop-strong">
        {/* Left Section: Text Content */}
        <div className="flex flex-col justify-center md:pl-10">
          <div>
            <p className="text-lg text-color-subtle">Hey, I&apos;m</p>
            <h1 className="ml-3 mt-2 text-4xl font-bold text-color">
              Matt Millard<span className="ml-3">👋</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-color-muted">
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

      <main className="col-start-2 pt-12">
        <h2 className="text-xl text-color">Latest Coding challenge solution</h2>
        <DateTime date="Jan 11, 2025" dateTime="2025-01-11" />

        <div className="mt-4 border-t border-edge-muted py-6">
          <CodeBlock language="tsx">
            {`
  // Double each value in the array in place
  export function doubleArray(arr, index = 0) {
  // base case
  if (index >= arr.length) {
    return arr;
  }
  // double value
  arr[index] *= 2;
  // call recursively
    return doubleArray(arr, index + 1);
  }

  console.log(doubleArray([1, 2, 3, 4, 5]));
            `}
          </CodeBlock>
        </div>

        <h2 className="text-xl text-color">Featured Posts</h2>
        <div className="mt-4 border-t border-edge-muted pt-10">
          <FeaturedPosts />
        </div>
      </main>

      <Footer />
    </div>
  );
}
