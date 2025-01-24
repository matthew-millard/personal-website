import clsx from "clsx";

interface HRProps extends React.ComponentPropsWithoutRef<"hr"> {
  additionalClasses?: string;
}

export default function HR({ additionalClasses, ...props }: HRProps) {
  return (
    <hr
      {...props}
      className={clsx("border-edge-muted-extra", additionalClasses)}
    />
  );
}
