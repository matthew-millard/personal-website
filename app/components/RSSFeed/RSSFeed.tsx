import { RssIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "~/components";

export default function RSSFeed() {
  const tooltipId = "rss-feed";
  return (
    <>
      <button
        type="button"
        className="text-icon-muted"
        data-tooltip-id={tooltipId}
        data-tooltip-content="RSS Feed"
      >
        <RssIcon aria-hidden="true" className="size-5" />
      </button>
      <Tooltip id={tooltipId} />
    </>
  );
}
