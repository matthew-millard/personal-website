import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <Link to="/" className="text-color-muted -m-1.5 p-1.5 font-sohne text-lg">
      Matt Millard
    </Link>
  );
}
