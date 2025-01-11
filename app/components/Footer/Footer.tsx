import { Logo, Socials } from "~/components";

export default function Footer() {
  return (
    <footer className="flex items-end justify-between pb-10">
      <div>
        <Logo />
        <p className="text-sm font-light text-color-muted">
          © 2025 Matt Millard. All rights reserved.
        </p>
        <a
          href="https://github.com/matthew-millard/personal-website"
          target="_blank"
          rel="noreferrer"
          className="text-light text-xs text-color-subtle underline underline-offset-4"
        >
          View Source code
        </a>
      </div>
      <Socials width={20} height={20} />
    </footer>
  );
}
