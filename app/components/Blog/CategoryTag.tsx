import { Link } from "@remix-run/react";

interface CategoryTagProps {
  href: string;
  title: string;
}

const tagColors = new Map<string, { base: string; hover: string }>([
  [
    "Algorithms & Data Structures",
    { base: "bg-tag-algodata", hover: "hover:bg-tag-algodata-hover" },
  ],
  [
    "Programming Languages",
    { base: "bg-tag-proglang", hover: "hover:bg-tag-proglang-hover" },
  ],
  [
    "Web Development",
    { base: "bg-tag-webdev", hover: "hover:bg-tag-webdev-hover" },
  ],
]);

function getTagClassNames(title: string) {
  const tagColor = tagColors.get(title) || {
    base: "bg-tag",
    hover: "hover:bg-tag-hover",
  };
  return `${tagColor.base} ${tagColor.hover}`;
}

export default function CategoryTag({ href, title }: CategoryTagProps) {
  const tagClassNames = getTagClassNames(title);
  return (
    <Link
      to={href}
      className={`${tagClassNames} relative z-10 rounded-full px-3 py-1.5 text-xs font-medium text-tag`}
    >
      {title}
    </Link>
  );
}
