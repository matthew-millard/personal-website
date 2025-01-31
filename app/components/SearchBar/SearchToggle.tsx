import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Dispatch, SetStateAction } from "react";

export interface SearchToggleProps {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchToggle({
  searchOpen,
  setSearchOpen,
}: SearchToggleProps) {
  return (
    <button
      type="button"
      onClick={() => setSearchOpen(!searchOpen)}
      className="relative"
    >
      <span className="sr-only">
        {searchOpen ? "Close search dialog" : "Open search dialog"}
      </span>
      <MagnifyingGlassIcon
        className="size-5 text-icon-muted hover:text-icon-hover"
        aria-hidden="true"
      />
    </button>
  );
}
