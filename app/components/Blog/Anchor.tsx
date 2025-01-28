import clsx from "clsx";

interface AnchorProps extends React.ComponentPropsWithoutRef<"a"> {
  additionalClasses?: string;
}

export default function Anchor({
  children,
  additionalClasses,
  ...props
}: AnchorProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "hover:text-primary-hover text-primary underline underline-offset-2",
        additionalClasses,
      )}
    >
      {children}
    </a>
  );
}
