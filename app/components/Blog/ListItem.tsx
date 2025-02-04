import clsx from "clsx";
import React from "react";

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  additionalClasses?: string;
}

export default function ListItem({
  children,
  additionalClasses,
  ...props
}: ListItemProps) {
  return (
    <li {...props} className={clsx("leading-relaxed", additionalClasses)}>
      {children}
    </li>
  );
}
