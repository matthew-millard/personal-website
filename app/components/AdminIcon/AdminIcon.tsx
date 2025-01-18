import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export default function AdminIcon() {
  return (
    <Link to="/admin">
      <WrenchScrewdriverIcon className="h-5 w-5 text-icon-muted" />
    </Link>
  );
}
