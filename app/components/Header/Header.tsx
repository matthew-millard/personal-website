import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { Logo, RSSFeed, ThemeSwitch } from "~/components";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-backdrop sticky -top-px z-20">
      <nav
        aria-label="Global"
        className="border-b-edge-subtle flex items-center border-b py-4 lg:mx-auto"
      >
        <div className="flex flex-1 lg:mr-24 lg:flex-none">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-icon-subtle -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
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
              className="text-link hover:text-link-hover text-sm"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden gap-x-3 lg:flex lg:flex-1 lg:justify-end">
          <ThemeSwitch />
          <RSSFeed />
        </div>
      </nav>

      {/* Mobile */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="bg-panel sm:border-l-edge-muted fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-4 sm:max-w-sm sm:border-l">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-icon-subtle -m-2.5 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-line-subtle -my-6 divide-y">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="text-color hover:bg-panel-hover -mx-3 block rounded-sm px-3 py-2 text-base"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="flex gap-x-3 py-6">
                <ThemeSwitch />
                <RSSFeed />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
