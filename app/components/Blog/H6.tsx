import clsx from "clsx";

interface H6Props extends React.ComponentPropsWithoutRef<"h6"> {
  additionalClasses?: string;
}

export default function H6({ children, additionalClasses, ...props }: H6Props) {
  return (
    <h6
      {...props}
      className={clsx(
        "text-pretty text-lg font-medium leading-loose tracking-wide text-color",
        additionalClasses,
      )}
    >
      {children}
    </h6>
  );
}
