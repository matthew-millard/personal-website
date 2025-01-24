import clsx from "clsx";

interface H1Props extends React.ComponentPropsWithoutRef<"h1"> {
  additionalClasses?: string;
}

export default function H1({ children, additionalClasses, ...props }: H1Props) {
  return (
    <h1
      {...props}
      className={clsx(
        "text-pretty text-5xl font-bold leading-tight tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </h1>
  );
}
