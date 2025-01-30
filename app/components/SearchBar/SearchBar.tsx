import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useFetcher } from "@remix-run/react";
import { useRef, useState } from "react";
import { H5, P, PendingIndicator } from "~/components";
import { useDebounce } from "~/hooks";
import type { SearchResults } from "~/routes/search";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useFetcher({ key: "search" });
  const [query, setQuery] = useState("");

  const isSearching = search.state !== "idle";
  const debouncedIsSearching = useDebounce(isSearching, 200);

  const debouncedQuery = useDebounce(query, 300);

  // Only show results if query is NOT empty
  const searchResults =
    query && Array.isArray(search.data) ? (search.data as SearchResults[]) : [];

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
        placeholder="Search blog posts..."
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
      {debouncedIsSearching ? (
        <div className="col-start-1 row-start-1 mr-2 place-self-end self-center p-2">
          <PendingIndicator />
        </div>
      ) : query ? (
        <button
          type="reset"
          onClick={handleReset}
          className="col-start-1 row-start-1 mr-2 place-self-end self-center rounded-full p-2 text-icon-muted transition-colors duration-100 hover:bg-zinc-500/50 hover:text-color"
          aria-label="Clear search input"
        >
          <XMarkIcon aria-hidden="true" className="size-5" />
        </button>
      ) : null}
      {searchResults.length > 0 ? (
        <ul className="max-h-96 scroll-py-3 divide-y divide-edge-muted-extra overflow-y-auto border-t border-t-edge-muted-extra">
          {searchResults.map((blog) => (
            <li
              key={blog.id}
              className="px-10 py-5 text-icon-muted transition-colors duration-100 hover:bg-zinc-500/50 hover:text-color"
            >
              <Link to={`/blog/${blog.slug}`} prefetch="intent">
                <H5>{blog.title}</H5>
                <P>{blog.description}</P>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        debouncedQuery && (
          <P additionalClasses="p-3 border-t border-t-edge-muted-extra">
            No results found
          </P>
        )
      )}
    </search.Form>
  );
}
