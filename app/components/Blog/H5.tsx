import clsx from "clsx";

interface H5Props extends React.ComponentPropsWithoutRef<"h5"> {
  additionalClasses?: string;
}

export default function H5({ children, additionalClasses, ...props }: H5Props) {
  return (
    <h5
      {...props}
      className={clsx(
        "text-pretty text-xl font-medium leading-snug tracking-wide text-color",
        additionalClasses,
      )}
    >
      {children}
    </h5>
  );
}
