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
        "text-blue-500 underline underline-offset-2 hover:text-blue-400",
        additionalClasses,
      )}
    >
      {children}
    </a>
  );
}
