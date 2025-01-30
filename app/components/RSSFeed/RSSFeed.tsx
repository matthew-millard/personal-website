import { RssIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export default function RssFeed() {
  return (
    <Link to="/rss.xml" prefetch="intent" target="_blank">
      <RssIcon
        aria-hidden="true"
        className="size-5 text-icon-muted hover:text-icon-hover"
      />
    </Link>
  );
}
