import { RssIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export default function RssFeed() {
  return (
    <Link to="/rss.xml" prefetch="intent" target="_blank">
      <RssIcon aria-hidden="true" className="h-5 w-5 text-icon-muted" />
    </Link>
  );
}
