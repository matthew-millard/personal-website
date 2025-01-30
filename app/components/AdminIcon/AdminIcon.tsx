import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export default function AdminIcon() {
  return (
    <Link to="/admin">
      <WrenchScrewdriverIcon className="size-5 text-icon-muted hover:text-icon-hover" />
    </Link>
  );
}
