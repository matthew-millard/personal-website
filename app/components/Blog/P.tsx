import clsx from "clsx";

interface PProps extends React.ComponentPropsWithoutRef<"p"> {
  children?: React.ReactNode;
  additionalClasses?: string;
}

export default function P({ children, additionalClasses, ...props }: PProps) {
  return (
    <p
      {...props}
      className={clsx(
        "font-normal leading-relaxed tracking-normal text-color",
        additionalClasses,
      )}
    >
      {children}
    </p>
  );
}
