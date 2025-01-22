import React from "react";
import ListItem from "./ListItem";

export default function UnorderedList({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul {...props} className="list-inside list-disc space-y-2 text-color">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === "li" ? (
          <ListItem {...child.props} className="mt-3">
            {child.props.children}
          </ListItem>
        ) : (
          child
        ),
      )}
    </ul>
  );
}
