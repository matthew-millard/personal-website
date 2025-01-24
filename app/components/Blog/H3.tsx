import clsx from "clsx";

interface H3Props extends React.ComponentPropsWithoutRef<"h3"> {
  additionalClasses?: string;
}

export default function H3({ children, additionalClasses, ...props }: H3Props) {
  return (
    <h3
      {...props}
      className={clsx(
        "text-pretty text-3xl font-semibold leading-snug tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </h3>
  );
}
