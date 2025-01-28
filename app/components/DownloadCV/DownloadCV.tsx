export default function DownloadCV() {
  return (
    <a
      download
      href="/download-cv"
      className="hover:text-primary-hover group flex items-center justify-center gap-x-1 px-3 py-2 text-sm font-medium tracking-wide text-primary transition md:justify-end"
    >
      Download CV{" "}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 stroke-zinc-500 group-hover:stroke-zinc-400"
      >
        <path
          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
}
