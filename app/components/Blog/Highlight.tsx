import clsx from "clsx";

interface HighlightProps extends React.ComponentPropsWithoutRef<"mark"> {
  additionalClasses?: string;
}

export default function Highlight({
  children,
  additionalClasses,
  ...props
}: HighlightProps) {
  return (
    <mark
      {...props}
      className={clsx("rounded bg-lime-400 px-1 text-black", additionalClasses)}
      aria-label="Highlighted text"
    >
      {children}
    </mark>
  );
}
