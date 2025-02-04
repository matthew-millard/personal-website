import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { useState } from "react";
import {
  AdminIcon,
  Logo,
  RssFeed,
  SearchBar,
  SearchToggle,
  SearchToggleWithContainer,
  ThemeSwitch,
} from "~/components";
import { useCommandK, useIsAdmin } from "~/hooks";
import { classNames } from "~/utils";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isAdmin = useIsAdmin();
  useCommandK(setSearchOpen);

  return (
    <header className="sticky -top-px z-30 border-b border-edge-muted-extra bg-backdrop">
      <nav aria-label="Global" className="flex items-center py-4 lg:mx-auto">
        <div className="flex flex-1 lg:mr-24 lg:flex-none">
          <Logo />
        </div>

        <div className="flex gap-x-4 lg:hidden">
          <SearchToggle setSearchOpen={setSearchOpen} searchOpen={searchOpen} />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-icon-subtle"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => {
                return classNames(
                  "text-sm text-link hover:text-link-hover",
                  isActive
                    ? "underline decoration-primary decoration-2 underline-offset-4 hover:decoration-primary-hover"
                    : "",
                );
              }}
              prefetch="intent"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-x-3 lg:flex lg:flex-1 lg:justify-end">
          {/* <SearchToggle setSearchOpen={setSearchOpen} searchOpen={searchOpen} /> */}
          <SearchToggleWithContainer
            setSearchOpen={setSearchOpen}
            searchOpen={searchOpen}
          />
          {isAdmin ? <AdminIcon /> : null}
          <ThemeSwitch />
          <RssFeed />
        </div>
      </nav>

      {/* Mobile */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-panel px-6 py-4 sm:max-w-sm sm:border-l sm:border-l-edge-muted">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-icon-subtle"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-line-subtle">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-sm px-3 py-2 text-base text-color hover:bg-panel-hover"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="flex gap-x-3 py-6">
                <ThemeSwitch />
                <RssFeed />
                {isAdmin ? <AdminIcon /> : null}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-zinc-950/90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-xl rounded-md border border-edge-muted-extra bg-backdrop-muted shadow-2xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <SearchBar />
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}
