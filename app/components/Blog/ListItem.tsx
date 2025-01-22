import React from "react";

export default function ListItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li {...props} className={`leading-relaxed ${className}`}>
      {children}
    </li>
  );
}
