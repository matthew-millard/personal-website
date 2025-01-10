import { Logo, Socials } from "~/components";

export default function Footer() {
  return (
    <footer className="flex items-end justify-between pb-10">
      <div>
        <Logo />
        <p className="text-color-muted text-sm font-light">
          © 2025 Matt Millard. All rights reserved.
        </p>
      </div>
      <Socials width={20} height={20} />
    </footer>
  );
}
