import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";
import { useRef, useState } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useFetcher();
  const [query, setQuery] = useState("");

  function handleReset() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <search.Form
      method="GET"
      action="/search"
      className="grid grid-cols-1 text-zinc-800"
      role="search"
    >
      <input
        name="query"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          search.submit(event.currentTarget.form); // Note to self: consider using debounce
        }}
        type="search"
        placeholder="Search..."
        className="no-cancel col-start-1 row-start-1 h-12 w-full bg-transparent pl-10 pr-12 text-base text-color sm:text-sm"
        data-autofocus
        ref={inputRef}
        autoComplete="off"
        aria-label="Search"
      />

      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-icon-muted"
      />
      {query ? (
        <button
          type="button"
          onClick={handleReset}
          className="col-start-1 row-start-1 mr-2 place-self-end self-center rounded-full p-2 text-icon-muted hover:bg-zinc-500/50 hover:text-color"
          aria-label="Clear search input"
        >
          <XMarkIcon aria-hidden="true" className="size-5" />
        </button>
      ) : null}
    </search.Form>
  );
}
