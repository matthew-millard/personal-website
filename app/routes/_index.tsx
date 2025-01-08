import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Matt Millard" }];

export default function Index() {
  return (
    <main>
      <h1 className="font-sohne text-secondary text-3xl font-semibold">
        Matt Millard
      </h1>
    </main>
  );
}
