import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <Link to="/" className="-m-1.5 p-1.5 font-sohne text-base text-white">
      Matt Millard
    </Link>
  );
}
