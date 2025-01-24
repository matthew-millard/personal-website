import clsx from "clsx";

interface H5Props extends React.ComponentPropsWithoutRef<"h5"> {
  additionalclasses?: string;
}

export default function H5({ children, additionalclasses, ...props }: H5Props) {
  return (
    <h5
      {...props}
      className={clsx(
        "text-pretty text-xl font-medium leading-relaxed tracking-wide text-color",
        additionalclasses,
      )}
    >
      {children}
    </h5>
  );
}
