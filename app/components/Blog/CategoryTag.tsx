import { Category } from "@prisma/client";
import { Link } from "@remix-run/react";
import { formatCategory } from "~/utils";

interface CategoryTagProps {
  href: string;
  title: string;
}

const tagColors = new Map<string, { base: string; hover: string }>([
  [
    Category.ALGORITHMS_AND_DATA_STRUCTURES,
    { base: "bg-tag-algodata", hover: "hover:bg-tag-algodata-hover" },
  ],
  [
    Category.PROGRAMMING_LANGUAGES,
    { base: "bg-tag-proglang", hover: "hover:bg-tag-proglang-hover" },
  ],
  [
    Category.WEB_DEVELOPMENT,
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
      {formatCategory(title)}
    </Link>
  );
}
