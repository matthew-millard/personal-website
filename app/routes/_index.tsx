import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components";

export const meta: MetaFunction = () => [{ title: "Matt Millard" }];

export default function Index() {
  return (
    <div>
      <Header />
    </div>
  );
}
