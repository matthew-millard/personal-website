import clsx from "clsx";

interface H2Props extends React.ComponentPropsWithoutRef<"h2"> {
  additionalClasses?: string;
}

export default function H2({ children, additionalClasses, ...props }: H2Props) {
  return (
    <h2
      {...props}
      className={clsx(
        "text-pretty text-4xl font-semibold leading-snug tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </h2>
  );
}
