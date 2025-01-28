import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <Link to="/" className="-m-1.5 p-1.5 text-lg text-color" prefetch="intent">
      Matt Millard
    </Link>
  );
}
