import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Small } from "~/components";
import { SearchToggleProps } from "./SearchToggle";

type SearchToggleWithContainer = SearchToggleProps;

export default function SearchToggleWithContainer({
  searchOpen,
  setSearchOpen,
}: SearchToggleWithContainer) {
  return (
    <button
      type="button"
      onClick={() => setSearchOpen(!searchOpen)}
      className="group flex w-60 items-center rounded-full border border-edge-muted-extra px-5 py-3 hover:border-edge-muted"
    >
      <div className="flex flex-grow items-center">
        <span className="sr-only">
          {searchOpen ? "Close search dialog" : "Open search dialog"}
        </span>
        <MagnifyingGlassIcon
          className="size-5 text-icon-muted hover:text-icon-hover"
          aria-hidden="true"
        />
        <Small additionalClasses="text-color-subtle ml-3">Search blog...</Small>
      </div>
      <span className="leading-none text-color-subtle">
        <kbd className="font-sohne">⌘</kbd>
        <kbd>k</kbd>
      </span>
    </button>
  );
}
