import clsx from "clsx";

interface SmallProps extends React.ComponentPropsWithoutRef<"small"> {
  additionalClasses?: string;
}

export default function Small({
  children,
  additionalClasses,
  ...props
}: SmallProps) {
  return (
    <small
      {...props}
      className={clsx(
        "line-clamp-3 text-sm font-normal leading-snug tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </small>
  );
}
