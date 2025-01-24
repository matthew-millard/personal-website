import clsx from "clsx";

interface H4Props extends React.ComponentPropsWithoutRef<"h4"> {
  additionalClasses?: string;
}

export default function H4({ children, additionalClasses, ...props }: H4Props) {
  return (
    <h4
      {...props}
      className={clsx(
        "text-pretty text-2xl font-medium leading-relaxed tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </h4>
  );
}
