import { Anchor, Logo, Small, Socials } from "~/components";

export default function Footer() {
  return (
    <footer className="flex items-end justify-between pb-10">
      <div>
        <Logo />
        <Small additionalClasses="text-color-muted">
          © 2025 Matt Millard. All rights reserved.
        </Small>
        <Anchor
          href="https://github.com/matthew-millard/personal-website"
          additionalClasses="text-xs"
        >
          View Source code
        </Anchor>
      </div>
      <Socials width={20} height={20} />
    </footer>
  );
}
