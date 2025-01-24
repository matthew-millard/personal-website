import clsx from "clsx";

interface StrongProps extends React.ComponentPropsWithoutRef<"strong"> {
  additionalClasses?: string;
}

export default function Strong({
  children,
  additionalClasses,
  ...props
}: StrongProps) {
  return (
    <strong
      {...props}
      className={clsx("text-color-strong font-semibold", additionalClasses)}
    >
      {children}
    </strong>
  );
}
